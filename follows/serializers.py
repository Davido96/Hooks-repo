from rest_framework import serializers

from . import models

from users.models import Users
from profiles.serializers import MinimalProfileSerializer




class CreateFollowSerializer(serializers.Serializer):
    follow = serializers.PrimaryKeyRelatedField(queryset=models.Users.objects.all())

    def validate(self,data):
        user = self.context["user"]
        follow = data.get("follow")
        if user == follow:
            raise serializers.ValidationError("Cannot follow self.")
        if models.Follows.objects.filter(follower=user,following=follow).exists():
            raise serializers.ValidationError("Already following this user")
        data["follower"] = user
        data["following"] = data.pop("follow")
        return data

    def create(self,validated_data):
        output_instance = models.Follows.objects.create(**validated_data)
        return output_instance


class UnfollowSerializer(serializers.Serializer):
    unfollow = serializers.PrimaryKeyRelatedField(queryset=models.Users.objects.all())

    def validate(self,data):
        user = self.context["user"]
        unfollow = data.get("unfollow")
        if user == unfollow:
            raise serializers.ValidationError("Cannot perform this operation on self.")
        if not models.Follows.objects.filter(follower=user,following=unfollow).exists():
            raise serializers.ValidationError("This user has not been previously followed.")
        data["user"] = user
        return data

    def create(self,validated_data):
        unfollow = validated_data.get("unfollow")
        unfollow_output = MinimalProfileSerializer(unfollow.profile,many=False).data
        models.Follows.objects.filter(follower=validated_data.get("user"),following=unfollow).delete()
        output = {
            "user": unfollow_output,
            "message":"Unfollowed"
        }
        return output





class FollowSerializer(serializers.ModelSerializer):
    follower = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = models.Follows
        fields = ["id","follower","following"]

    def get_follower(self,obj):
        output = MinimalProfileSerializer(obj.follower.profile,many=False).data
        return output

    def get_following(self,obj):
        output = MinimalProfileSerializer(obj.following.profile,many=False).data
        return output
