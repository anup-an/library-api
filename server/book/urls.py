from django.urls import path
from . import views

urlpatterns = [
    path('books', views.BookViewSet.as_view({'get': 'list'})),
]
