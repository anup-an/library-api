import uuid
from django.db import models


class Genre(models.Model):
    name = models.CharField(
        max_length=255, help_text='Enter a book genre')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Language(models.Model):
    name = models.CharField(
        max_length=255, help_text='Enter a book genre')

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255)
    series = models.CharField(max_length=255, null=True, blank=True)
    author = models.ManyToManyField(
        'Author', help_text='Select an author for this book')

    description = models.TextField(
        max_length=1000, help_text='Enter a brief description of the book')
    edition = models.CharField(max_length=255, null=True, blank=True)
    isbn = models.CharField('ISBN', max_length=13, unique=True)
    pages = models.IntegerField(null=True, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    book_image = models.CharField(max_length=1000, null=True, blank=True)
    BOOK_FORMAT = (
        ('p', 'Paperback'),
        ('m', 'Mass Market Paperback'),
        ('k', 'Kindle edition'),
        ('e', 'Ebook'),
        ('h', 'Hardcover')
    )
    book_format = models.CharField(
        max_length=1,
        choices=BOOK_FORMAT,
        blank=True,
        null=True,
        help_text='Book availability',
    )
    genres = models.ManyToManyField(
        Genre, help_text='Select a genre for this book')
    language = language = models.ForeignKey(
        'Language', on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class BookInstance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text='Unique ID for the book')
    book = models.ForeignKey('Book', on_delete=models.RESTRICT, null=True)
    due_date = models.DateField(null=True, blank=True)

    LOAN_STATUS = (
        ('m', 'Maintenance'),
        ('l', 'On loan'),
        ('f', 'Free'),
        ('r', 'Reserved'),
    )

    status = models.CharField(
        max_length=1,
        choices=LOAN_STATUS,
        blank=True,
        default='f',
        null=True,
        help_text='Book availability',
    )

    class Meta:
        ordering = ['due_date']

    def __str__(self):
        return f'{self.id} ({self.book.title})'


class Author(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name}'
