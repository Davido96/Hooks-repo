from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from rest_framework import serializers

from . import models

import uuid


valid_interests = [
    "social networking",
    "dancing",
    "fun times",
    "social",
    "career",
    "business",
    "environment",
    "fitness",
    "nature",
    "sports",
    "recreation",
    "running",
    "cycling",
    "comedy",
    "coffee",
    "night waalks",
    "foodie",
    "dating",
    "relationship",
    "others"
]




class RetrieveProfileSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    monthly_sub_keys = serializers.SerializerMethodField()

    class Meta:
        model = models.Profile
        fields = ["id","full_name","display_pic","age","bio","gender","state","city","display_pic","interests","monthly_sub_keys"]

    def get_id(self,obj):
        return obj.user.id

    def get_monthly_sub_keys(self,obj):
        if obj.user.user_type != "Creator":
            return None
        return obj.monthly_sub_keys


class ProfileUpdateSerializer(serializers.Serializer):
    full_name = serializers.CharField(required=False)
    age = serializers.IntegerField(required=False)
    bio = serializers.CharField(required=False)
    gender = serializers.CharField(required=False)

    state = serializers.CharField(required=False)
    city = serializers.CharField(required=False)

    display_pic = serializers.ImageField(required=False)
    location = serializers.CharField(required=False)
    interests = serializers.JSONField(required=False)

    monthly_sub_keys = serializers.IntegerField(required=False)

    def validate_format(self,filename,allowed_formats):
        print(filename)
        if not filename.lower().endswith(allowed_formats):
            raise serializers.ValidationError(f"File format is not allowed.")

    def validate_size(self,file,valid_size):
        if file.size/1000000 > valid_size:
            raise serializers.ValidationError("File too large.")

    def validate_display_pic(self,file):
        self.validate_format(file.name,(".jpg",".jpeg",".png"))
        self.validate_size(file,2)
        return file

    def validate_monthly_sub_keys(self,value):
        if self.instance.user_type != "Creator":
            raise serializers.ValidationError("Fans are not allowed to set monthly subscription keys.")
        return value

    def validate_interests(self,value):
        if not isinstance(value,list):
            raise serializers.ValidationError("Interests must be a list of recognized interests.")
        outliers = list(set(value) - set(valid_interests))
        if len(outliers) != 0:
            raise serializers.ValidationError(f"Interests {outliers} are not recognized.")
        return value

    def update(self,instance,validated_data):
        instance.profile.full_name = validated_data.get("full_name",instance.profile.full_name)
        instance.profile.age = validated_data.get("age",instance.profile.age)
        instance.profile.gender = validated_data.get("gender",instance.profile.gender)
        instance.profile.bio = validated_data.get("bio",instance.profile.bio)

        instance.profile.state = validated_data.get("state",instance.profile.state)
        instance.profile.city = validated_data.get("city",instance.profile.city)

        instance.profile.location = validated_data.get("location",instance.profile.location)
        instance.profile.interests = validated_data.get("interests",instance.profile.interests)
        #Fans keys remain as default 0
        instance.profile.monthly_sub_keys = validated_data.get("monthly_sub_keys",instance.profile.monthly_sub_keys)

        display_pic = validated_data.get("display_pic")
        if not display_pic:
            pass
        else:
            filename = f"display_pic/{uuid.uuid4()}{display_pic.name}"
            path = default_storage.save(filename,ContentFile(display_pic.read()))
            url = default_storage.url(path)
            instance.profile.display_pic = url

        instance.profile.save()

        return instance.profile
