from django.shortcuts import render

import rest_framework
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from users.permissions import IsActiveAndLoggedin

from . import serializers,models

from users.models import Users


class ProfileView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        param = request.query_params.get("user_id")
        if not param:
            user = request.user
            profile = user.profile
            output = serializers.RetrieveProfileSerializer(profile,many=False).data
            return Response(output,status=status.HTTP_200_OK)
        else:
            user_retrieve = Users.objects.filter(id=param).first()
            if not user_retrieve:
                return Response({"error":"Invalid User Id"},status=status.HTTP_404_NOT_FOUND)
            else:
                profile = user_retrieve.profile
                output = serializers.RetrieveProfileSerializer(profile,many=False).data
                return Response(output,status=status.HTTP_200_OK)



class UpdateProfileView(APIView):
    permission_classes=[
        IsActiveAndLoggedin
    ]
    def put(self,request):
        user = request.user
        serializer = serializers.ProfileUpdateSerializer(data=request.data,instance=user)
        if serializer.is_valid(raise_exception=True):
            output_instance = serializer.save()
            output = serializers.RetrieveProfileSerializer(output_instance,many=False).data
            return Response(output,status=status.HTTP_200_OK)




class TestView(APIView):
    permission_classes = [
        AllowAny,
    ]
    def get(self,request):
        return Response({"status":"Installed"},status=status.HTTP_200_OK)
