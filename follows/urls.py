from django.urls import path
from . import views


urlpatterns = [
    path("",views.CreateFollowView.as_view(),name="Create-Follow"),
    path("followings/",views.RetrieveFollowings.as_view(),name="Retrieve-Followings"),
    path("followers/",views.RetrieveFollowersView.as_view(),name="Retrieve-Followers"),
    path("unfollow/",views.UnfollowView.as_view(),name="Unfollow"),
    path("recommended/",views.FollowRecommendationView.as_view(),name="Follow-Recommendation"),
    path("like/",views.LikeView.as_view(),name="Like-View"),
    path("like/respond/",views.AcceptRejectLikeView.as_view(),name="Accept-Reject-Like_view"),
]
