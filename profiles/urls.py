from django.urls import path
from . import views


urlpatterns = [
    path("",views.ProfileView.as_view(),name="Profile-View"),

    path("test/",views.TestView.as_view(),name="Test-View"),
]
