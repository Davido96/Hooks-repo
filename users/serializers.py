from rest_framework import serializers

from . import models
from profiles.models import Profile


from .Hasher import hasher
import uuid



user_type_options = (
    ("Fan","Fan"),
    ("Creator","Creator")
)


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    user_type = serializers.CharField(max_length=10)




class SignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=200,write_only=True)
    user_type = serializers.ChoiceField(choices=user_type_options,required=False)

    class Meta:
        model = models.Users
        fields = ["username","email","password","password2","user_type"]

        read_only_fields = ["username"]

    #TODO Develop OTP email confirmation algorithm to prevent inexistent email signups.

    def validate_email(self,value):
        if models.Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate(self,data):
        password1 = data.get("password")
        password2 = data.get("password2")
        if password1 != password2:
            raise serializers.ValidationError("Unmatched passwords.")
        else:
            validity = hasher().password_validity(password=password1)
            if validity != True:
                raise serializers.ValidationError(validity)
            else:
                return data

    def create(self,validated_data):
        validated_data["username"] = str(uuid.uuid4())
        validated_data.pop("password2")
        user = models.Users.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user



class SigninSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200,write_only=True)

    def validate(self,data):
        email = data.get("email").lower().strip()
        password = data.get("password")
        try:
            user = models.Users.objects.get(email__iexact=email)
            if not user.check_password(password):
                raise serializers.ValidationError("Invalid Email/Password.")
            return user
        except models.Users.DoesNotExist:
            raise serializers.ValidationError("Invalid Email/Password.")


class MinimalUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    gender = serializers.SerializerMethodField()
    display_pic = serializers.SerializerMethodField()

    class Meta:
        model= models.Users
        fields = ["id","full_name","gender","display_pic"]

    def get_full_name(self,obj):
        return obj.profile.full_name

    def get_gender(self,obj):
        return obj.profile.gender

    def get_display_pic(self,obj):
        return obj.profile.display_pic
