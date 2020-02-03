from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    pass


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    pass


@admin.register(Excos)
class ExcosAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    pass


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_filter = ['genre']


@admin.register(PrayerBox)
class PrayerBoxAdmin(admin.ModelAdmin):
    pass


@admin.register(LeaderMessage)
class LeaderMessageAdmin(admin.ModelAdmin):
    pass