# Generated by Django 2.1.4 on 2019-11-27 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordstudy', '0014_excosmessage_prayerbox'),
    ]

    operations = [
        migrations.CreateModel(
            name='LeaderMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='leader_images/')),
                ('message', models.TextField(max_length=1000)),
            ],
        ),
        migrations.DeleteModel(
            name='ExcosMessage',
        ),
    ]