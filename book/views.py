from book.models import Book
from rest_framework import filters, viewsets
from book.serializers import BookSerializer


# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['title']
    ordering = ['title']
