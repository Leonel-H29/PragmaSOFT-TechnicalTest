"""Users URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from series import views as user_views

router = DefaultRouter()
router.register(r'series', user_views.SeriesViewSet, basename='series')

urlpatterns = [
    path('', include(router.urls))
]