from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegistration.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('', views.UserView.as_view({'get': 'retrieve'}), name='user'),
    path('borrow-book',
         views.UserView.as_view({'post': 'borrow_book'}), name='borrow'),
    path('return-book',
         views.UserView.as_view({'post': 'return_book'}), name='return')
]
