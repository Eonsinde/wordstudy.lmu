from django.db import models
import uuid
import datetime
from django.utils import timezone
# Create your models here.


class Excos(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='excos')
    post = models.CharField(default='', max_length=100, blank=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        ordering = ['-pk']
        verbose_name_plural = 'Excos'


class Event(models.Model):
    title = models.CharField(max_length=200)
    venue = models.CharField(default="in front of university chapel", max_length=300)
    theme = models.CharField(max_length=500)
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.now)

    def __str__(self):
        return f'{self.title}'


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200, default='')
    message = models.TextField()

    def __str__(self):
        return f'{self.name}'


class Member(models.Model):
    name = models.CharField(max_length=300)
    department = models.CharField(max_length=300)
    room_no = models.CharField(max_length=100, default='')
    email = models.EmailField()
    date_of_birth = models.DateField()
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}'


class Genre(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.name}'


class Book(models.Model):
    id = models.CharField(max_length=50, default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=200)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    author = models.CharField(default='', max_length=300)
    file = models.FileField(upload_to='books', null=True, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['-date']


class PrayerBox(models.Model):
    name = models.CharField(max_length=200)
    prayer_point = models.TextField(max_length=1000)

    def __str__(self):
        return self.name


class LeaderMessage(models.Model):
    name = models.CharField(max_length=100, default='')
    photo = models.ImageField(upload_to='leader_images/')
    message = models.TextField(max_length=1000)

    def __str__(self):
        return f'{self.message[:50]}...'




