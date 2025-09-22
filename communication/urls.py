from django.urls import path
from . import views


urlpatterns = [
    path("notifications/",views.NotificationView.as_view(),name="Notifications"),


    path("notification/test/",views.TestNotificationView.as_view(),name="Test Notification"),
]
