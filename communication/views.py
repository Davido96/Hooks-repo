from django.db.models import Q
from django.http import Http404

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from communication import serializers
from users.permissions import IsActiveAndLoggedin

from .utils import send_notification
from . import serializers
from . import models


def retrieve_object(object_id,db_model,name=""):
    object = db_model.objects.filter(id=object_id).first()
    if not object:
        raise Http404(f"Invalid {name} id")
    return object



class NotificationView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        user = request.user
        notifications = user.notifications.order_by("-timestamp")
        output = serializers.NotificationSerializer(notifications,many=True).data
        return Response(output,status=status.HTTP_200_OK)

    def delete(self,request):
        user = request.user
        user.notifications.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class InitiateChatSessionView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def post(self,request):
        user = request.user
        serializer = serializers.InitiateChatSessionSerializer(data=request.data,context={"user":user})
        if serializer.is_valid(raise_exception=True):
            output_instance = serializer.save()
            output = serializers.ChatSessionSerializer(output_instance,many=False,context={"user":user}).data
            return Response(output,status=status.HTTP_200_OK)



class ChatSessionView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        user = request.user
        all_sessions = models.ChatSession.objects.filter(
            Q(initiator=user)|
            Q(contributor=user)
        )
        output = serializers.ChatSessionSerializer(all_sessions,many=True,context={"user":user}).data
        return Response(output,status=status.HTTP_200_OK)




class ChatMessagesView(APIView):
    permission_classes = [
        IsActiveAndLoggedin,
    ]

    def get(self,request):
        user = request.user
        param = request.query_params.get("session_id")
        if not param:
            return Response({"error":"A session_id query parameter is required for this request."},status=status.HTTP_400_BAD_REQUEST)
        else:
            session = retrieve_object(param,models.ChatSession,"ChatSession")
            all_messages = session.chathistory_set.all().order_by("timestamp")
            output = serializers.ChatMessagesSerializer(all_messages,many=True).data
            return Response(output,status=status.HTTP_200_OK)




class TestNotificationView(APIView):
    permission_classes = [
        IsActiveAndLoggedin
    ]

    def post(self,request):
        user = request.user
        serializer = serializers.TestNotificationSerialzer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            target_user = data.get("user")
            message = data.get("message")
            send_notification(target_user,message)
            return Response({"status":"sent push notification"},status=status.HTTP_200_OK)
