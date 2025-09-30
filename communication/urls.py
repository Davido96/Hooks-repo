from django.urls import path
from . import views


urlpatterns = [
    path("notifications/",views.NotificationView.as_view(),name="Notifications"),
    path("chat/sessions/",views.ChatSessionView.as_view(),name="Retrieve-Chat-Sessions"),
    path("chat/session/initiate/",views.InitiateChatSessionView.as_view(),name="Initiate-Chat-Session"),
    path("chats/",views.ChatMessagesView.as_view(),name="Retrieve-Chats"),


    path("notification/test/",views.TestNotificationView.as_view(),name="Test Notification"),
]
