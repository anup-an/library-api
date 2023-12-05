from datetime import date, timedelta
from django.contrib.auth import login, logout
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status, viewsets
from django.db import transaction
from book.models import BookInstance
from common.utils import get_objects_for_update
from user.models import User
from user.serializers import UserLoginSerializer, UserRegistrationSerializer, UserSerializer


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def borrow_book(self, request):
        id = request.data.get('id')
        with transaction.atomic():
            book = get_objects_for_update(
                BookInstance,
                "Book not available for borrowing.",
                book_id=id,
                status='f'
            )
            book.status = 'l'
            book.due_date = date.today() + timedelta(weeks=2)
            book.save()
            user = User.objects.get(id=request.user.id)
            user.books_onloan.add(book)
            return Response('Book borrowed successfully', status=status.HTTP_200_OK)

    def return_book(self, request):
        id = request.data.get('id')
        with transaction.atomic():
            book = BookInstance.objects.get(
                id=id)
            book.status = 'f'
            book.due_date = None
            book.save()
            user = User.objects.get(id=request.user.id)
            user.books_onloan.delete(book)
            return Response('Book returned successfully', status=status.HTTP_200_OK)


class UserRegistration(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.authenticate_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response('You have successfully logged out of your account', status=status.HTTP_200_OK)
