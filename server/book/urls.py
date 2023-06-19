from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookViewSet.as_view({'get': 'list'})),
]
