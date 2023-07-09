from rest_framework import serializers
from django.contrib.auth import get_user_model
from telemedecine.models import *


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'type',
                  'profile_photo', 'matricule', 'hopital', 'images_envoyes',
                  'images_reçus', 'rapports_envoyes', 'rapports_reçus']
        extra_kwargs = {
            'password': {'write_only': True},
            'images_envoyes': {'write_only': True},
            'images_reçus': {'write_only': True},
            'rapports_envoyes': {'write_only': True},
            'rapports_reçus': {'write_only': True}
        }


class UserDetailSerializer(serializers.ModelSerializer):

    hopital = serializers.SerializerMethodField()
    images_envoyes = serializers.SerializerMethodField()
    images_reçus = serializers.SerializerMethodField()
    rapports_envoyes = serializers.SerializerMethodField()
    rapports_reçus = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'type',
                  'profile_photo', 'matricule', 'hopital', 'images_envoyes',
                  'images_reçus', 'rapports_envoyes', 'rapports_reçus']
        extra_kwargs = {
            'password': {'write_only': True},
            'images_envoyes': {'read_only': True},
            'images_reçus': {'read_only': True},
            'rapports_envoyes': {'read_only': True},
            'rapports_reçus': {'read_only': True}
        }

    def get_hopital(self, instance):
        queryset = instance.hopital
        serializer = HopitalListSerializer(queryset)
        return serializer.data

    def get_images_envoyes(self, instance):
        queryset = instance.images_envoyes.all()
        serializer = Image_dicomDetailSerializer(queryset, many=True)
        return serializer.data

    def get_images_reçus(self, instance):
        queryset = instance.images_reçus.all()
        serializer = Image_dicomDetailSerializer(queryset, many=True)
        return serializer.data

    def get_rapports_envoyes(self, instance):
        queryset = instance.rapports_envoyes.all()
        serializer = RapportDetailSerializer(queryset, many=True)
        return serializer.data

    def get_rapports_reçus(self, instance):
        queryset = instance.rapports_reçus.all()
        serializer = RapportDetailSerializer(queryset, many=True)
        return serializer.data


class HopitalListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = ['id', 'name', 'address', 'employes']
        extra_kwargs = {'employes': {'read_only': True}}


class HopitalDetailSerializer(serializers.ModelSerializer):
    employes = serializers.SerializerMethodField()

    class Meta:
        model = Hopital
        fields = ['id', 'name', 'address', 'employes']
        extra_kwargs = {'employes': {'read_only': True}}

    def get_employes(self, instance):
        queryset = instance.employes.all()
        serializer = UserListSerializer(queryset, many=True)
        return serializer.data


class PatientListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name',
                  'sexe', 'date_de_naissance', 'tel', 'adresse', 'images', 'rapports']
        extra_kwargs = {'images': {'read_only': True},
                        'rapports': {'read_only': True}}


class PatientDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    rapports = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name',
                  'sexe', 'date_de_naissance', 'tel', 'adresse', 'images', 'rapports']
        extra_kwargs = {'images': {'read_only': True}}

    def get_images(self, instance):
        queryset = instance.images.all()
        serializer = Image_dicomListSerializer(queryset, many=True)
        return serializer.data

    def get_rapports(self, instance):
        queryset = instance.rapports.all()
        serializer = RapportListSerializer(queryset, many=True)
        return serializer.data


class Image_dicomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image_dicom
        fields = ['id', 'id_image', 'patient',
                  'envoyeur', 'destinataire', 'rapport']
        extra_kwargs = {'rapport': {'read_only': True}}


class Image_dicomDetailSerializer(serializers.ModelSerializer):
    patient = serializers.SerializerMethodField()
    envoyeur = serializers.SerializerMethodField()
    destinataire = serializers.SerializerMethodField()
    rapport = serializers.SerializerMethodField()

    class Meta:
        model = Image_dicom
        fields = ['id', 'id_image', 'patient',
                  'envoyeur', 'destinataire', 'rapport']
        extra_kwargs = {'rapport': {'read_only': True}}

    def get_patient(self, instance):
        queryset = instance.patient
        serializer = PatientListSerializer(queryset)
        return serializer.data

    def get_envoyeur(self, instance):
        queryset = instance.envoyeur
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_destinataire(self, instance):
        queryset = instance.destinataire
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_rapport(self, instance):
        queryset = instance.rapport
        serializer = RapportListSerializer(queryset)
        return serializer.data


class RapportListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rapport
        fields = ['id', 'fichier', 'envoyeur',
                  'destinataire', 'patient', 'image_dicom']


class RapportDetailSerializer(serializers.ModelSerializer):
    patient = serializers.SerializerMethodField()
    envoyeur = serializers.SerializerMethodField()
    destinataire = serializers.SerializerMethodField()
    image_dicom = serializers.SerializerMethodField()

    class Meta:
        model = Rapport
        fields = ['id', 'fichier', 'patient',
                  'envoyeur', 'destinataire', 'image_dicom']

    def get_patient(self, instance):
        queryset = instance.patient
        serializer = PatientListSerializer(queryset)
        return serializer.data

    def get_envoyeur(self, instance):
        queryset = instance.envoyeur
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_destinataire(self, instance):
        queryset = instance.destinataire
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_image_dicom(self, instance):
        queryset = instance.image_dicom
        serializer = Image_dicomListSerializer(queryset)
        return serializer.data
