from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

from follows import serializers
from users.permissions import IsActiveAndLoggedin

from django.http import Http404
from django.db.models import Q


from . import models
from users.models import Users
from profiles.models import Profile


class LikePagination(PageNumberPagination):
    page_size = 10



def retrieve_query_paramter(request,parameter,valid_options=None):
    param = request.query_params.get(parameter)
    if not param:
        raise Http404(f"A {parameter} query parameter is required for this request")
    if valid_options:
        if param not in valid_options:
            raise Http404(f"Invalid {parameter} value. Valid options are {valid_options}")
    return param
    

class CreateFollowView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
]
    
    def post(self,request):
        serializer = serializers.CreateFollowSerializer(data=request.data,context={"user":request.user})
        if serializer.is_valid(raise_exception=True):
            output_instance = serializer.save()
            output = serializers.FollowSerializer(output_instance,many=False).data
            output["message"] = "Following"
            return Response(output,status=status.HTTP_201_CREATED)

class RetrieveFollowings(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        user = request.user
        params = request.query_params
        if not "count" in params:
            followings = models.Follows.objects.filter(follower=user)
            output = serializers.FollowSerializer(followings,many=True).data
            return Response(output,status=status.HTTP_200_OK)
        else:
            #Ensuring no value is passed for count and is treated as just a flag
            if request.query_params["count"] == "":
                followings_count = models.Follows.objects.filter(follower=user).count()
                output = {
                    "following":followings_count
                }
                return Response(output,status=status.HTTP_200_OK)
            else:
                return Response({'error':"count should not have a value."})

class RetrieveFollowersView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]
    def get(self,request):
        user = request.user
        param = request.query_params
        if "count" not in param:
            all_followers = models.Follows.objects.filter(following=user)
            output = serializers.FollowSerializer(all_followers,many=True).data
            return Response(output,status=status.HTTP_200_OK)
        else:
            if param.get("count") == "":
                followers_count = models.Follows.objects.filter(following=user).count()
                output = {
                    "followers":followers_count
                }
                return Response(output,status=status.HTTP_200_OK)
            else:
                return Response({'error':"count should not have a value."})



class UnfollowView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def post(self,request):
        serializer = serializers.UnfollowSerializer(data=request.data,context={"user":request.user})
        if serializer.is_valid(raise_exception=True):
            output = serializer.save()
            return Response(output,status=status.HTTP_200_OK)


class FollowRecommendationView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        user = request.user
        recommended_users = Profile.objects.filter(
            Q(state=user.profile.state) |
            Q(city=user.profile.city) |
            Q(location=user.profile.location) |
            Q(interests__in=user.profile.interests)
        ).exclude(user=user)
        output = serializers.MiniUserProfileSerializer(recommended_users,many=True).data
        return Response(output,status=status.HTTP_200_OK)



class LikeView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def post(self,request):
        user = request.user
        serializer = serializers.CreateLikeSerializer(data=request.data,context={"user":user})
        if serializer.is_valid(raise_exception=True):
            output_instance = serializer.save()
            output = serializers.LikesSerializer(output_instance,many=False,context={"user":user}).data
            return Response(output,status=status.HTTP_200_OK)

    def get(self,request):
        user = request.user
        param = retrieve_query_paramter(request,"status",["requested","pending","confirmed"])
        print(param)
        if param == "requested":
            likes = models.UserLike.objects.filter(liked=user,status="pending").order_by("-timestamp")
        elif param == "pending":
            likes = models.UserLike.objects.filter(liker=user,status="pending").order_by("-timestamp")
        elif param == "confirmed":
            likes = models.UserLike.objects.filter(
                Q(liker=user,status="confirmed")|
                Q(liked=user,status="confirmed")
            ).order_by("-timestamp")
        paginator = LikePagination()
        paginated_items = paginator.paginate_queryset(likes,request)
        serialized_items = serializers.LikesSerializer(paginated_items,many=True,context={"user":user}).data
        output = paginator.get_paginated_response(serialized_items).data
        return Response(output,status=status.HTTP_200_OK)

class AcceptRejectLikeView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def post(self,request):
        user = request.user
        serializer = serializers.AcceptRejectLikeSerializer(data=request.data,context={"user":user})
        if serializer.is_valid(raise_exception=True):
            output = serializer.save()
            return Response(output,status=status.HTTP_200_OK)
