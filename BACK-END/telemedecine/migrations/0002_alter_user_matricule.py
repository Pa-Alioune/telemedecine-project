# Generated by Django 4.2.2 on 2023-07-02 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('telemedecine', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='matricule',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='matricule'),
        ),
    ]
