from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from telemedecine.models import *
from telemedecine.serializers import *


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


class RapportViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = RapportListSerializer
    detail_serializer_class = RapportDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rapport.objects.all()
