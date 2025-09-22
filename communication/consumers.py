from channels.db import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

import json


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        self.group_name = f"notifications_for_user_{user.id}"
        await self.channel_layer.group_add(self.group_name,self.channel_name)
        await self.accept()

        print(f"User is Connected to {self.group_name}")

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name,self.channel_name)

    async def send_notification(self,event):
        output = {
            "message":event["message"]
        }
        await self.send(text_data=json.dumps(output))
