from django.contrib import admin
from accounts.models import *

# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass

