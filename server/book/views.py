from book.filters import DynamicSearchFilter, DynamicOrderFilter
from book.models import Book
from rest_framework import viewsets
from book.serializers import BookSerializer
from django_filters.rest_framework import DjangoFilterBackend
from common.utils import DefaultPagination


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = DefaultPagination
    filter_backends = [
        DjangoFilterBackend, DynamicOrderFilter, DynamicSearchFilter]
    filterset_fields = ['genres__name', 'language__name', 'book_format']
    ordering = ['title']
