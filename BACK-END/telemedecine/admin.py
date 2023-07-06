from django.contrib import admin
from telemedecine.models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'matricule', 'first_name',
                    'last_name', 'type', 'hopital')


class HopitalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address')


class PatientAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'sexe',
                    'date_de_naissance', 'tel', 'adresse')


class Image_dicomAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_image', 'patient', 'envoyeur', 'destinataire')


class RapportAdmin(admin.ModelAdmin):
    list_display = ('id', 'fichier', 'patient', 'envoyeur', 'destinataire')


admin.site.register(User, UserAdmin)
admin.site.register(Hopital, HopitalAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Image_dicom, Image_dicomAdmin)
admin.site.register(Rapport, RapportAdmin)


# Register your models here.
