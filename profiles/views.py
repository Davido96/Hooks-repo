from django.shortcuts import render
from django.core.cache import cache

import rest_framework
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from users.permissions import IsActiveAndLoggedin

from . import serializers,models
from utilities.utils import invalidate_cache

from users.models import Users




class ProfileView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        param = request.query_params.get("user_id")
        if not param:
            user = request.user
            cache_key = f"user_{user.id}_profile"
            cached_data = cache.get(cache_key)
            if not cached_data:
                profile = user.profile
                output = serializers.RetrieveProfileSerializer(profile,many=False).data
                cache.set(cache_key,output,timeout=60*60*24)
            else:
                output = cached_data
            return Response(output,status=status.HTTP_200_OK)
        else:
            user_retrieve = Users.objects.filter(id=param).first()
            if not user_retrieve:
                return Response({"error":"Invalid User Id"},status=status.HTTP_404_NOT_FOUND)
            else:
                cache_key = f"user_{user_retrieve.id}_profile"
                cached_data = cache.get(cache_key)
                if not cached_data:
                    profile = user_retrieve.profile
                    output = serializers.RetrieveProfileSerializer(profile,many=False).data
                    cache.set(cache_key,output,timeout=60*60*24)
                else:
                    output = cached_data
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
            invalidate_cache(f"user_{user.id}_profile")
            return Response(output,status=status.HTTP_200_OK)




class TestView(APIView):
    permission_classes = [
        AllowAny,
    ]
    def get(self,request):
        return Response({"status":"Installed"},status=status.HTTP_200_OK)
