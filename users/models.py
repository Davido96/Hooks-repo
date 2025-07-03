from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    user_type = models.CharField(max_length=10,default="Fan")
