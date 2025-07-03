from django.urls import path
from . import views


urlpatterns = [
    #path("",views.TestView.as_view(),name="Test-View"),
    path("signup/",views.SignupView.as_view(),name="signup"),
    path("signin/",views.SigninView.as_view(),name="signin"),
]
