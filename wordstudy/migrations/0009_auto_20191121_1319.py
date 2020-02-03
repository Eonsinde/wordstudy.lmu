# Generated by Django 2.1.4 on 2019-11-21 12:19

import datetime
from django.db import migrations, models
from django.utils.timezone import utc
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('wordstudy', '0008_auto_20191120_2227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='id',
            field=models.CharField(default=uuid.uuid4, max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='member',
            name='date_joined',
            field=models.DateField(default=datetime.datetime(2019, 11, 21, 12, 19, 24, 651772, tzinfo=utc)),
        ),
    ]
