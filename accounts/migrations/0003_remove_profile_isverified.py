# Generated by Django 2.1.4 on 2021-01-31 12:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210129_0216'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='isVerified',
        ),
    ]
