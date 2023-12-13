from rest_framework import serializers
from book.models import Book, BookInstance


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        depth = 2


class BookInstanceSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = BookInstance
        fields = ['id', 'book', 'due_date', 'status']
        depth = 2
