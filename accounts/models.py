from django.db import models
from django.contrib.auth.models import User

# Create your models here.


def handle_prof_img_upload(instance, filename):
    return '/'.join(['profile_images', str(instance), filename])


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default='')
    image = models.ImageField(upload_to=handle_prof_img_upload, null=True, blank=True)
    # cv = models.FileField(upload_to=handle_cv_upload, null=True, blank=True)
    phone_no = models.CharField(max_length=20, default='')
    city = models.CharField(max_length=100, default='', null=True, blank=True)
    state = models.CharField(max_length=100, default='', null=True, blank=True)
    address = models.CharField(max_length=1000, default='', null=True, blank=True)
    isVerified = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username}'

