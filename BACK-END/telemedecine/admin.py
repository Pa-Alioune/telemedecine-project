from django.contrib import admin
from telemedecine.models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'matricule', 'first_name',
                    'last_name', 'type', 'hopital')


class HopitalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address')


admin.site.register(User, UserAdmin)
admin.site.register(Hopital, HopitalAdmin)


# Register your models here.
