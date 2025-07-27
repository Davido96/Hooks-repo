from django.db import models

from users.models import Users


class Follows(models.Model):
    follower = models.ForeignKey(Users,on_delete=models.CASCADE,related_name="follower")
    following = models.ForeignKey(Users,on_delete=models.CASCADE,related_name="following")
    at = models.DateTimeField(auto_now_add=True)
