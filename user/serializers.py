from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()


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
