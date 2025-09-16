from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied

from datetime import date


class CanLikeUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        today = date.today()
        if today > user.profile.date:
            user.profile.date = today
            user.profile.liked_today = 1 
            user.profile.save()
            return True
        else:
            print(user.profile.liked_today)
            print(user.profile.max_daily_likes)
            if user.profile.liked_today == user.profile.max_daily_likes:
                raise PermissionDenied("You have reached your maximum likes for the day.")
            else:
                user.profile.liked_today += 1
                user.profile.save()
                return True

