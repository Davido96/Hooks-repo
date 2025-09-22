from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from communication import serializers
from users.permissions import IsActiveAndLoggedin

from .utils import send_notification
from . import serializers



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
