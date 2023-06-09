from django.contrib import admin
from .models import Author, Genre, Book, BookInstance, Language
from user.models import User

# Register your models here.

admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(User)
admin.site.register(Language)
admin.site.register(BookInstance)
