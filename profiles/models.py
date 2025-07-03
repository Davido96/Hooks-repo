from django.db import models
from users.models import Users

class Profile(models.Model):
    user = models.OneToOneField(Users,on_delete=models.CASCADE,related_name="profile")
    full_name = models.CharField(max_length=250,default="N/A")
    display_pic = models.CharField(max_length=300,default="N/A")
    location = models.CharField(max_length=300,default="N/A")
    interests = models.JSONField(default=list)
