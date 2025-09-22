from rest_framework import serializers
from . import models


from . import models
from users.models import Users


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserNotifications
        fields = ["id","message","timestamp"]



class TestNotificationSerialzer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())
    message = serializers.CharField()
