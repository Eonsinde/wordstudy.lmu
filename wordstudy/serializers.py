from wordstudy.models import *
from rest_framework import serializers
from rest_framework import status
from rest_framework import exceptions


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


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    genre = GenreSerializer()
    author = AuthorSerializer()

    class Meta:
        model = Book
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

    def validate(self, attrs):
        genre_name = attrs['genre']['name']
        author_name = attrs['author']['name']

        try:  # check if the exist
            Genre.objects.get(name__icontains=genre_name)
            Author.objects.get(name__icontains=author_name)
        except Author.DoesNotExist:
            print('Author not found')
            raise exceptions.ValidationError([exceptions.status.HTTP_400_BAD_REQUEST])
        except Genre.DoesNotExist:
            print('Genre not found')
            raise exceptions.ValidationError([exceptions.status.HTTP_400_BAD_REQUEST])
        else:
            return attrs

    def create(self, validated_data):
        genre_name = validated_data['genre']['name']
        author_name = validated_data['author']['name']

        genre = Genre.objects.get(name__icontains=genre_name)
        author = Author.objects.get(name__icontains=author_name)

        book = Book.objects.create(title=validated_data['title'], genre=genre, author=author)

        return book


class PrayerBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerBox
        fields = '__all__'


class LeaderMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaderMessage
        fields = '__all__'
