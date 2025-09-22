from django.db import models
from django.db.models.fields import related


class UserNotifications(models.Model):
    user = models.ForeignKey("users.Users",on_delete=models.CASCADE,related_name="notifications")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)




class ChatSession(models.Model):
    initiator = models.ForeignKey("users.Users",on_delete=models.CASCADE,related_name="initiator")
    contributor = models.ForeignKey("users.Users",on_delete=models.CASCADE,related_name="contributor")
    timestamp = models.DateTimeField(auto_now=True)

class ChatHistory(models.Model):
    session = models.ForeignKey(ChatSession,on_delete=models.CASCADE)
    actor = models.ForeignKey('users.Users',on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)
