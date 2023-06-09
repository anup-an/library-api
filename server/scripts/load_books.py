import csv
import itertools
import re
from book.models import Book, Genre, Language, Author


def run():
    with open('data/library_books.csv') as file:
        reader = csv.reader(file, delimiter=';')
        next(reader)

        Book.objects.all().delete()
        Genre.objects.all().delete()
        Author.objects.all().delete()
        Language.objects.all().delete()

        for row in itertools.islice(reader, 1000):
            book_genres = re.sub(r"[\[\]']", "", row[6]).split(',')
            book_authors = re.sub("[\(\[].*?[\)\]]", "", row[2]).split(',')
            book_formats = ['Paperback', 'Mass Market Paperback',
                            'Kindle edition', 'ebook', 'Hardcover']
            author_instances = []
            genre_instances = []
            if row[5] != '9999999999999' and row[4] != '' and row[9].isnumeric() and row[7] in book_formats:
                for genre in book_genres:
                    book_genre, _ = Genre.objects.get_or_create(name=genre)
                    genre_instances.append(book_genre)

                for author in book_authors:
                    book_author, _ = Author.objects.get_or_create(
                        name=author)
                    author_instances.append(book_author)

                language, _ = Language.objects.get_or_create(name=row[4])

                book = Book(title=row[0],
                            series=row[1],
                            description=row[3],
                            language=language,
                            isbn=row[5],
                            book_format=row[7][0].lower(),
                            edition=row[8],
                            pages=int(row[9]),
                            publisher=row[10],
                            book_image=row[11],
                            )
                book.save()
                book.author.set(author_instances)
                book.genres.set(genre_instances)
