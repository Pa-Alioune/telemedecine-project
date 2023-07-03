from django.db import models
from django.contrib.auth.models import AbstractUser


class Hopital(models.Model):
    name = models.CharField(max_length=50, verbose_name='nom')
    address = models.CharField(max_length=100, verbose_name='adresse')

    def __str__(self):
        return self.name


class User(AbstractUser):
    RADIOLOGUE = "radiologue"
    AGENT_DE_SANTE = "agent_de_sante"

    TYPE = [(RADIOLOGUE, "radiologue"), (AGENT_DE_SANTE, "agent_de_sante")]
    profile_photo = models.ImageField(
        null=True, blank=True, verbose_name='Photo de profil')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='modifié le')
    matricule = models.CharField(
        max_length=50, verbose_name='matricule', null=True, blank=True)
    hopital = models.ForeignKey(
        Hopital, on_delete=models.SET_NULL, related_name='employes', null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# Create your models here.
