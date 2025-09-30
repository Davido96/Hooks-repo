from django.db.models import Q

from rest_framework import serializers
from . import models


from . import models
from users.models import Users
from follows.models import UserLike


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserNotifications
        fields = ["id","message","timestamp"]

class MinimalUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    display_pic = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = ["id","full_name","display_pic"]

    def get_full_name(self,obj):
        return obj.profile.full_name

    def get_display_pic(self,obj):
        return obj.profile.display_pic


class ChatSessionSerializer(serializers.ModelSerializer):
    recipient = serializers.SerializerMethodField()

    class Meta:
        model = models.ChatSession
        fields = ["id","recipient"]

    def get_recipient(self,obj):
        user = self.context["user"]
        if obj.initiator == user:
            recipient = obj.contributor
        else:
            recipient = obj.initiator
        output = MinimalUserSerializer(recipient,many=False).data
        return output



class ChatMessagesSerializer(serializers.ModelSerializer):
    actor = serializers.SerializerMethodField()

    class Meta:
        model = models.ChatHistory
        fields = ["id","actor","message","timestamp"]

    def get_actor(self,obj):
        output = MinimalUserSerializer(obj.actor,many=False).data
        return output


class InitiateChatSessionSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    def validate_user(self,value):
        user = self.context["user"]
        if user == value:
            raise serializers.ValidationError("Cannot Initiate Chat Session with self.")
        if not UserLike.objects.filter(
            Q(liker=user,liked=value,status="confirmed")|
            Q(liker=value,liked=user,status="confirmed")
        ).exists():
            raise serializers.ValidationError("A like is yet to be established between you and this user.")
        return value

    def create(self,validated_data):
        user = self.context["user"]
        other_user = validated_data.get("user")
        session = models.ChatSession.objects.filter(
            Q(initiator=user,contributor=other_user) |
            Q(initiator=other_user,contributor=user)
        ).first()
        if not session:
            session = models.ChatSession.objects.create(initiator=user,contributor=other_user)
        return session



class TestNotificationSerialzer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())
    message = serializers.CharField()
