# Generated by Django 3.2.1 on 2021-11-19 05:32

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='profilePic',
            field=models.ImageField(default='media/1.png', upload_to=users.models.user_directory_path),
        ),
    ]
