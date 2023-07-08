# Generated by Django 4.2.2 on 2023-07-08 10:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('telemedecine', '0003_patient_hopital_created_at_hopital_updated_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='rapport',
            name='image_dicom',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='telemedecine.image_dicom'),
        ),
        migrations.AlterField(
            model_name='image_dicom',
            name='destinataire',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='images_reçus', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='rapport',
            name='destinataire',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rapports_reçus', to=settings.AUTH_USER_MODEL),
        ),
    ]
