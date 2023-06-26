from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from book.serializers import BookInstanceSerializer
from user.models import User

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    books_onloan = BookInstanceSerializer(many=True)

    class Meta:
        model = User
        fields = ['username', 'books_onloan']


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, data):
        user = UserModel.objects.create_user(
            username=data['username'],
            password=data['password']
        )
        user.save()
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = UserModel
        fields = '__all__'

    def authenticate_user(self, data):
        user = authenticate(
            username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('User not found')
        return user
