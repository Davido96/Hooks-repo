from django.urls import path
from . import views


urlpatterns = [
    path("",views.CreateFollowView.as_view(),name="Create-Follow"),
    path("followings/",views.RetrieveFollowings.as_view(),name="Retrieve-Followings"),
    path("followers/",views.RetrieveFollowersView.as_view(),name="Retrieve-Followers"),
    path("unfollow/",views.UnfollowView.as_view(),name="Unfollow"),
]
