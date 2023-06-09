from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.EmailField(max_length=255, unique=True)

    def __str__(self):
        return self.username
