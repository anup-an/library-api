from rest_framework import serializers
from django.contrib.auth import get_user_model

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
