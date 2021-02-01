from django.db import models
from django.contrib.auth.models import User

# Create your models here.


def handle_prof_img_upload(instance, filename):
    return '/'.join(['profile_images', str(instance), filename])


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default='')
    image = models.ImageField(upload_to=handle_prof_img_upload, null=True, blank=True)
    phone_no = models.CharField(max_length=20, default='')

    def __str__(self):
        return f'{self.user.username}'

