from rest_framework import serializers
from django.contrib.auth import get_user_model
from telemedecine.models import *


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'type',
                  'profile_photo', 'matricule', 'hopital']
        extra_kwargs = {'password': {'write_only': True}}


class UserDetailSerializer(serializers.ModelSerializer):

    hopital = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'type',
                  'profile_photo', 'matricule', 'hopital']
        extra_kwargs = {'password': {'write_only': True}}

    def get_hopital(self, instance):
        queryset = instance.hopital
        serializer = HopitalListSerializer(queryset)
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
        serializer = UserDetailSerializer(queryset, many=True)
        return serializer.data
