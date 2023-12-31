"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from telemedecine.views import *

router = routers.SimpleRouter()
router.register('user', UserViewSet, basename='user')
router.register('connected-user', UserConnectedViewSet,
                basename='connected-user')
router.register('hopital', HopitalViewSet,
                basename='hopital')
router.register('patient', PatientViewSet,
                basename='patient')
router.register('image-dicom', Image_dicomViewSet,
                basename='image-dicom')
router.register('image-dicom-brut', DicomImageViewSet,
                basename='image-dicom-brut')
router.register('rapport', RapportViewSet,
                basename='rapport')
router.register('radiologue', RadiologueViewSet,
                basename='radiologue')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token', TokenObtainPairView.as_view(), name='obtain_tokens'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/', include(router.urls))

]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
