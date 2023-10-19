from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth.views import LogoutView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#from user import views as user_views
from user import views as user_views


class DefaultRouter(routers.DefaultRouter):
    """
    Extends `DefaultRouter` class to add a method for
    extending url routes from another router.
    """

    def extend(self, router):
        """
        Extend the routes with url routes of the passed in router.

        Args:
             router: SimpleRouter instance containing route definitions.
        """
        self.registry.extend(router.registry)


router = DefaultRouter()
#router.extend(routerUser)


url = 'api/'
urlpatterns = [
    #path(url + 'admin/', admin.site.urls),
    path(url + 'login/', user_views.CustomLoginView.as_view(), name='login'),
    path(url + 'logout/', LogoutView.as_view(), name='logout'),
    path(url, include(router.urls)),
   
]


