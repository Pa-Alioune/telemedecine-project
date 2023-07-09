from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework import status
import requests
from telemedecine.models import *
from telemedecine.serializers import *
from django.http import HttpResponse
import pydicom


class MultipleSerializerMixin:

    detail_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.detail_serializer_class is not None:  # type: ignore
            return self.detail_serializer_class
        return super().get_serializer_class()  # type: ignore


class UserViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = UserListSerializer
    detail_serializer_class = UserDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(is_active=True)


class UserConnectedViewSet(MultipleSerializerMixin, ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer

    def list(self, request):
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response({'user': serializer.data})


class HopitalViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = HopitalListSerializer
    detail_serializer_class = HopitalDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Hopital.objects.all()


class PatientViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = PatientListSerializer
    detail_serializer_class = PatientDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Patient.objects.all()


class Image_dicomViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = Image_dicomListSerializer
    detail_serializer_class = Image_dicomDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Image_dicom.objects.all()

    def create(self, request, *args, **kwargs):
        # Récupération des données du formulaire
        image = request.FILES.get('image')
        patient_id = request.data.get('patient')
        envoyeur_id = request.data.get('envoyeur')
        destinataire_id = request.data.get('destinataire')

        # Vérification des données reçues
        if not all([image, patient_id, envoyeur_id, destinataire_id]):
            return Response({'error': 'Données manquantes dans le formulaire.'}, status=status.HTTP_400_BAD_REQUEST)

        # Lecture des données binaires de l'image
        image_data = image.read()

        # URL du serveur Orthanc pour stocker l'image DICOM
        url = 'http://localhost:8042/instances'

        # Envoi de la requête POST au serveur Orthanc avec les données binaires brutes
        response = requests.post(url, data=image_data, headers={
                                 'Content-Type': 'application/dicom'})

        # Vérification de la réponse du serveur Orthanc
        if response.status_code == 200:
            # Récupération de l'ID de l'image DICOM depuis la réponse du serveur Orthanc
            image_id = response.json().get('ID')
            parent_series = response.json().get('ParentSeries')
            if not image_id:
                return Response({'error': 'Impossible de récupérer l\'ID de l\'image DICOM.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Création de l'objet Image_dicom dans la base de données
            patient = Patient.objects.get(id=patient_id)
            envoyeur = User.objects.get(id=envoyeur_id)
            destinataire = User.objects.get(id=destinataire_id)
            image_dicom = Image_dicom.objects.create(
                id_image=image_id, parent_series=parent_series, patient=patient, envoyeur=envoyeur, destinataire=destinataire)
            serializer = Image_dicomListSerializer(image_dicom)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            error_message = response.json().get('error')
            return Response({'error': 'Une erreur s\'est produite lors du stockage de l\'image DICOM dans Orthanc.', 'orthanc_error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RapportViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = RapportListSerializer
    detail_serializer_class = RapportDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rapport.objects.all()


class RadiologueViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = UserListSerializer
    detail_serializer_class = UserDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(is_active=True, type="radiologue")


class DicomImageViewSet(MultipleSerializerMixin, ModelViewSet):
    def list(self, request, *args, **kwargs):
        return Response({'error': 'Il faut préciser l\'id pour télécharger l\'image.'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        # Récupération de l'objet Image_dicom à partir de son ID
        image_dicom = Image_dicom.objects.get(id=pk)

        # Récupération de l'ID de l'image DICOM
        image_id = image_dicom.id_image

        # URL de l'image dans Orthanc
        url = f'http://localhost:8042/instances/{image_id}/file'

        try:
            # Téléchargement de l'image depuis Orthanc
            response = requests.get(url, stream=True)

            # Vérification de la réponse du serveur Orthanc
            if response.status_code == 200:
                # Renvoi de l'image en tant que réponse HTTP
                image = response.content
                return HttpResponse(image, content_type='application/dicom')
            else:
                error_message = response.json().get('error')
                return HttpResponse(error_message, status=response.status_code)
        except requests.exceptions.RequestException as e:
            return HttpResponse(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
