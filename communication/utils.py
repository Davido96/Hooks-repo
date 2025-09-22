from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from . import models


def notify(user_id,text="None"):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"notifications_for_user_{user_id}",
        {
            "type":"send_notification",
            "message":text
        }
    )

def send_notification(user,text):
    notify(user.id,text)
    models.UserNotifications.objects.create(user=user,message=text)
