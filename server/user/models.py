from django.db import models
from django.contrib.auth.models import AbstractUser

from book.models import BookInstance


class User(AbstractUser):
    username = models.EmailField(max_length=255, unique=True)

    def __str__(self):
        return self.username
