from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from follows import serializers
from users.permissions import IsActiveAndLoggedin

from . import models


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
