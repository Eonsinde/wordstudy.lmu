from wordstudy.models import *
from rest_framework import serializers
from rest_framework import status
from rest_framework import exceptions
import json


class ExcosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excos
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    genre = GenreSerializer()

    class Meta:
        model = Book
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

    def validate(self, attrs):
        if attrs.get('genre'):
            genre_name = attrs['genre']['name']

            try:  # check if the exist
                Genre.objects.get(name__icontains=genre_name)
            except Genre.DoesNotExist:
                raise exceptions.ValidationError([exceptions.status.HTTP_400_BAD_REQUEST])
            else:
                return attrs
        return attrs

    def create(self, validated_data):
        genre_name = validated_data['genre']['name']

        genre = Genre.objects.get(name__icontains=genre_name)

        book = Book.objects.create(title=validated_data['title'], author=validated_data['author'], genre=genre,
                                   file=validated_data['file'])

        return book

    def update(self, instance, validated_data):
        if validated_data.get('title'):
            instance.title = validated_data['title']
        if validated_data.get('author'):
            instance.author = validated_data['author']
        if validated_data.get('file'):
            instance.file = validated_data['file']
        if validated_data.get('genre'):
            genre_name = validated_data['genre']['name']
            genre = Genre.objects.get(name__icontains=genre_name)
            instance.genre = genre

        instance.save()

        return instance


class PrayerBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerBox
        fields = '__all__'


class LeaderMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaderMessage
        fields = '__all__'
