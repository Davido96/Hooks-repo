from django.db import models
from django.contrib.auth.models import AbstractUser


account_status_options = (
    ("Active","Active"),
    ("Inactive","Inactive")
)

class Users(AbstractUser):
    user_type = models.CharField(max_length=10,default="Fan")
    logged_in = models.BooleanField(default=True)
    account_status = models.CharField(choices=account_status_options,default="Active")
