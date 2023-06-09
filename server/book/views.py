from book.filters import DynamicSearchFilter, DynamicOrderFilter
from book.models import Book
from rest_framework import filters, viewsets
from book.serializers import BookSerializer
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [
        DjangoFilterBackend, DynamicOrderFilter, DynamicSearchFilter]
    filterset_fields = ['genres__name', 'language__name', 'book_format']
    ordering = ['title']
