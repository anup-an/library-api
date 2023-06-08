from book.models import Book
from rest_framework import routers, serializers, viewsets
from book.serializers import BookSerializer


# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
