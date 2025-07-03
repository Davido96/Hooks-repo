from rest_framework import serializers

from . import models


class RetrieveProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(max_length=250,required=False)
    location = serializers.CharField(max_length=300,required=False)
    interests = serializers.JSONField(required=False)
    #TODO After hosting, set up uploads to third party storage for display picture.

    class Meta:
        model = models.Profile
        fields = ["full_name","display_pic","location","interests"]

    def validate_interests(self,value):
        if not isinstance(value,list):
            raise serializers.ValidationError("Interests must be a list.")
        return value

    def update(self,instance,validated_data):
        instance.full_name = validated_data.get("full_name",instance.full_name)
        instance.location = validated_data.get("location",instance.location)
        instance.interests = validated_data.get("interests",instance.interests)
        #TODO Save display picture after writing upload algorithm.
        instance.save()
        return instance
