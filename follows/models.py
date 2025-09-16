from django.db import models
from django.db.models.fields import related

from users.models import Users


like_status_options = (
    ("pending","pending"),
    ("confirmed","confirmed")
)



class Follows(models.Model):
    follower = models.ForeignKey(Users,on_delete=models.CASCADE,related_name="follower")
    following = models.ForeignKey(Users,on_delete=models.CASCADE,related_name="following")
    at = models.DateTimeField(auto_now_add=True)


class UserLike(models.Model):
    liker = models.ForeignKey(Users,on_delete=models.CASCADE,related_name="liker")
    liked = models.ForeignKey(Users,on_delete=models.CASCADE,related_name="liked")
    status = models.CharField(default="pending",choices=like_status_options)
    timestamp = models.DateTimeField(auto_now_add=True)
