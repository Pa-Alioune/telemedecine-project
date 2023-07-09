from django.db import models
from django.contrib.auth.models import AbstractUser


class Hopital(models.Model):
    name = models.CharField(max_length=50, verbose_name='nom')
    address = models.CharField(max_length=100, verbose_name='adresse')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='modifié le')

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


class Patient(models.Model):
    MASCULIN = "M"
    FEMININ = "F"

    SEXE = [(MASCULIN, "M"), (FEMININ, "F")]

    first_name = models.CharField(max_length=150, verbose_name="prénom")
    last_name = models.CharField(max_length=150, verbose_name="nom")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='modifié le')
    sexe = models.CharField(max_length=1, choices=SEXE)
    date_de_naissance = models.DateField(null=True, blank=True)
    adresse = models.CharField(max_length=100, null=True, blank=True)
    tel = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Image_dicom(models.Model):
    id_image = models.CharField(max_length=150)
    parent_series = models.CharField(max_length=200)
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name="images", null=True, blank=True)
    envoyeur = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="images_envoyes", null=True, blank=True)
    destinataire = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="images_reçus", null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return f"{self.id_image}"


class Rapport(models.Model):
    fichier = models.FileField(upload_to="rapports/")
    envoyeur = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="rapports_envoyes", null=True, blank=True)
    destinataire = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="rapports_reçus", null=True, blank=True)
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name="rapports", null=True, blank=True)
    image_dicom = models.OneToOneField(
        Image_dicom, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return f"{self.fichier}"
