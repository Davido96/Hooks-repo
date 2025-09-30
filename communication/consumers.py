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


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        #Late imports to ensure proper loading at runtime.
        from django.db.models import Q
        from . import models
        from users.models import Users

        self.user = self.scope["user"]
        other_user_id = self.scope["url_route"]["kwargs"]["other_user"]
        try:
            other_user = await sync_to_async(Users.objects.get)(id=other_user_id)
        except Users.DoesNotExist:
            await self.close()

        if self.user.id == other_user_id:
            await self.close()
        else:
            room_suffix = f"{max(int(self.user.id),int(other_user_id))}_{min(int(self.user.id),int(other_user_id))}"
            self.room_name = f"Session_{room_suffix}"
            try:
                self.chat_session = await sync_to_async(models.ChatSession.objects.get)(
                    Q(initiator=self.user,contributor=other_user) |
                    Q(initiator=other_user,contributor=self.user)
                )
            except models.ChatSession.DoesNotExist:
                self.chat_session = await sync_to_async(models.ChatSession.objects.create)(initiator=self.user,contributor=other_user)
            await self.channel_layer.group_add(self.room_name,self.channel_name)
            await self.accept()

    async def disconnect(self,code):
        await self.channel_layer.group_discard(self.room_name,self.channel_name)

    async def receive(self,text_data):
        #Late imports
        from . import models

        event = json.loads(text_data)

        message = event.get("message","")
        await sync_to_async(models.ChatHistory.objects.create)(session=self.chat_session,actor=self.user,message=message)

        await self.channel_layer.group_send(
            self.room_name,
            {
                "type":"send_message",
                "user_id":self.user.id,
                "email":self.user.email,
                "message":message
            }
        )
    async def send_message(self,event):
        text_blob = {
            "user_id":event["user_id"],
            "email":event["email"],
            "message":event["message"]
        }
        await self.send(text_data=json.dumps(text_blob))



