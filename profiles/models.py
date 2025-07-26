from django.db import models
from users.models import Users

class Profile(models.Model):
    user = models.OneToOneField(Users,on_delete=models.CASCADE,related_name="profile",primary_key=True)

    full_name = models.CharField(max_length=250,default="N/A")
    age = models.IntegerField(default=0)
    bio = models.CharField(default="N/A")
    gender = models.CharField(default="N/A")

    state = models.CharField(default="N/A")
    city = models.CharField(default="N/A")

    display_pic = models.CharField(max_length=300,default="https://hooks-storage.s3.amazonaws.com/display_pic/275581f4-10bb-4145-86f7-6313cbba88e3default_pp.jpeg")
    location = models.CharField(max_length=300,default="N/A")
    interests = models.JSONField(default=list)

    #For User types Creators
    monthly_sub_keys = models.IntegerField(default=0)
