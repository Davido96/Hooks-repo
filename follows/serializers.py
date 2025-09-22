from rest_framework import serializers

from django.conf import settings
from django.db.models import Q

from . import models

from users.models import Users
from profiles.models import Profile
from profiles.serializers import MinimalProfileSerializer

from utilities.utils import invalidate_cache
from communication.utils import send_notification

from datetime import datetime,date
import pytz



like_actions = (
    ("accept","accept"),
    ("reject","reject")
)




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
        user = validated_data.get("user")
        invalidate_cache([f"user_{unfollow.id}_followers",f"user_{user.id}_followings"])

        unfollow_output = MinimalProfileSerializer(unfollow.profile,many=False).data
        models.Follows.objects.filter(follower=user,following=unfollow).delete()
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


class RetrieveFollowingsSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()

    class Meta:
        model = models.Follows
        fields = ["following"]

    def get_following(self,obj):
        output = MinimalProfileSerializer(obj.following.profile,many=False).data
        return output

class RetrieveFollowersSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()

    class Meta:
        model = models.Follows
        fields = ["followers"]

    def get_followers(self,obj):
        output = MinimalProfileSerializer(obj.follower.profile,many=False).data
        return output



class MiniUserProfileSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    subscribers = serializers.SerializerMethodField()
    active = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["id","full_name","display_pic","age","location","followers","subscribers","interests","active"]

    def get_id(self,obj):
        return obj.user.id

    def get_followers(self,obj):
        user = obj.user
        followers = models.Follows.objects.filter(following=user).count()
        return followers

    def get_subscribers(self,obj):
        return "Not Available"

    def get_active(self,obj):
        user = obj.user
        now = datetime.now(pytz.timezone("UTC"))
        logged_in = user.last_login
        print(logged_in)
        if not logged_in:
            return False

        diff = (now - logged_in).total_seconds()
        diff_hours = int(diff/3600)
        if (diff_hours > settings.TOKEN_LIFETIME):
            return False
        return True


class CreateLikeSerializer(serializers.Serializer):
    like = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    def validate_like(self,value):
        user = self.context["user"]
        if models.UserLike.objects.filter(
            Q(liker=user,liked=value)|
            Q(liker=value,liked=user)
        ).exists():
            raise serializers.ValidationError("An existing/pending like exist between you and this user.")
        if user == value:
            raise serializers.ValidationError("Cannot like your self.")
        return value

    def validate(self,data):
        user = self.context["user"]
        today = date.today()
        if today > user.profile.date:
            user.profile.date=today
            user.profile.liked_today = 1 
            user.profile.save()
            return data
        else:
            if user.profile.liked_today == user.profile.max_daily_likes:
                raise serializers.ValidationError("You have reached the maximum likes for the day.")
            else:
                user.profile.liked_today += 1 
                user.profile.save()
                return data

    def create(self,validated_data):
        validated_data['liker'] = self.context["user"]
        validated_data['liked'] = validated_data.pop("like")
        output = models.UserLike.objects.create(**validated_data)
        return output

class LikesSerializer(serializers.Serializer):
    like_id = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()

    class Meta:
        model = models.UserLike
        fields = ["like"]

    def get_like_id(self,obj):
        return obj.id

    def get_like(self,obj):
        user = self.context["user"]
        if obj.liker == user:
            like = obj.liked
        else:
            like = obj.liker
        like = MinimalProfileSerializer(like.profile,many=False).data
        return like


class AcceptRejectLikeSerializer(serializers.Serializer):
    like_instance = serializers.PrimaryKeyRelatedField(queryset=models.UserLike.objects.all())
    action = serializers.ChoiceField(choices=like_actions)

    def validate_like_instance(self,value):
        user = self.context["user"]
        if (user != value.liker) and (user != value.liked):
            raise serializers.ValidationError("You are not associated with this like instance.")

        liked = value.liked
        if user != liked:
            raise serializers.ValidationError("You cannot respond to this like request.")

        if value.status != "pending":
            raise serializers.ValidationError("This like instance has already been confirmed")
        return value

    def create(self,validated_data):
        user = self.context["user"]
        action = validated_data.get("action")
        like = validated_data.get("like_instance")

        notify_user = like.liker
        output = LikesSerializer(like,many=False,context={"user":user}).data
        if action == "accept":
            like.status = "confirmed"
            like.save()
            output["action"] = "Accepted"
            send_notification(notify_user,f"{user.profile.full_name} accepted your like.")
        else:
            like.delete()
            output["action"] = "Rejected"
            send_notification(notify_user,f"{user.profile.full_name} rejected your like.")
        return output
