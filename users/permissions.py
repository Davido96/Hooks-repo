from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied


class IsActiveAndLoggedin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated or not user.logged_in:
            raise PermissionDenied("You are not authenticated for this request.")
        if user.account_status != "Active":
            raise PermissionDenied("This account has been deactivated. Contact Admin for resolution.")
        return True
