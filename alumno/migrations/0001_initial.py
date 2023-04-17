# Generated by Django 4.2 on 2023-04-16 00:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alumno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('curso', models.CharField(max_length=100)),
                ('nota', models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20)])),
                ('estado', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'alumno',
            },
        ),
    ]