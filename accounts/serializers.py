from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import *
from django.contrib.auth import authenticate


# write your serializers here


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['user']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_superuser', 'profile']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True}}

    def create(self, validated_data):
        # remove some data from the validated result
        profile_data = validated_data.pop('profile')

        # print out the profile data
        print("In the serializer now \n Profile data:", profile_data, end='\n')

        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        user = User.objects.create_user(username, email, password, **validated_data)
        user.is_staff = True

        new_profile = Profile.objects.create(user=user, **profile_data)
        new_profile.save()

        # to create the wish list for the user
        return user

    def update(self, instance, validated_data):
        print(validated_data)
        if validated_data.get('username'):
            instance.username = validated_data.get('username')
        if validated_data.get('password'):
            instance.set_password(validated_data.get('password'))
        if validated_data.get('email'):
            instance.email = validated_data.get('email')
        if validated_data.get('first_name'):
            instance.first_name = validated_data.get('first_name')
        if validated_data.get('last_name'):
            instance.last_name = validated_data.get('last_name')
        if validated_data.get('profile', False) and validated_data.get('profile').get('image', False):
            needed_profile = Profile.objects.get(user=instance)
            needed_profile.image = validated_data.get('profile').get('image')
            needed_profile.save()
        if validated_data.get('profile', False) and validated_data.get('profile').get('phone_no', False):
            needed_profile = Profile.objects.get(user=instance)
            needed_profile.phone_no = validated_data.get('profile')['phone_no']
            needed_profile.save()

        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
