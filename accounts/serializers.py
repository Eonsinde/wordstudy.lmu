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
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'profile']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True}}

    def create(self, validated_data):
        # remove some data from the validated result
        profile_data = validated_data.pop('profile')

        # print out the profile data
        print("In the serializer now \n Profile data:", profile_data, end='\n')

        # print("Register form data:", validated_data['registerForm'], end='\n')
        # print('Profile form data:', validated_data['profileForm'])
        # print(json.dump())

        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        # interests_data = profile_data.pop('interests')
        user = User.objects.create_user(username, email, password, **validated_data)

        # to create the user profile
        # image_id = profile_data.pop('image')
        # print('Image ID:', image_id)
        # req_img = UploadModel.objects.get(pk=image_id)
        # print('Image Found', req_img)
        new_profile = Profile.objects.create(user=user, **profile_data)
        # new_profile.image = req_img

        # new_profile.interests.set(interests_data)
        new_profile.save()

        # to create the wish list for the user
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
