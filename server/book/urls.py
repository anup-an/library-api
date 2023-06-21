from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookViewSet.as_view({'get': 'list'})),
    path('<int:pk>', views.BookViewSet.as_view({'get': 'retrieve'}))
]
