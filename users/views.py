from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt import token_blacklist

from . import serializers



class SignupView(APIView):
    permission_classes = [
        AllowAny,
    ]
    serializer_class = serializers.SignupSerializer

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            output = serializers.UserSerializer(user).data
            return Response(output,status=status.HTTP_201_CREATED)

class SigninView(APIView):
    permission_classes = [
        AllowAny,
    ]
    serializer_class = serializers.SigninSerializer

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh_token = RefreshToken.for_user(user)
        output = {
            "refresh":str(refresh_token),
            "access":str(refresh_token.access_token),
            "user":{
                "email":user.email,
                "user_id":user.id
            }
        }
        return Response(output,status=status.HTTP_200_OK)






class TestView(APIView):
    permission_classes = [
        AllowAny,
    ]

    def get(self,request):
        return Response({"INSTALLED"},status=status.HTTP_200_OK)
