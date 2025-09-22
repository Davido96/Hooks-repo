from typing_extensions import clear_overloads
from urllib.parse import parse_qs
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async

from django.db import close_old_connections
from django.conf import settings
import jwt


@database_sync_to_async
def get_user(user_id):
    #Late imports
    from users.models import Users
    user = Users.objects.filter(id=user_id).first()
    if not user:
        from django.contrib.auth.models import AnonymousUser
        return AnonymousUser
    return user




class JWTCustomMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        #Late imports
        from django.contrib.auth.models import AnonymousUser
        from rest_framework_simplejwt.tokens import UntypedToken
        from rest_framework_simplejwt.exceptions import TokenError,InvalidToken


        close_old_connections()

        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token")
        user = AnonymousUser()

        if token:
            try:
                UntypedToken(token[0])

                data = jwt.decode(token[0], settings.SECRET_KEY,algorithms=["HS256"])
                user_id = data.get("user_id")
                if user_id:
                    user = await get_user(user_id)

            except (TokenError, InvalidToken, jwt.DecodeError):
                pass
        #Scope Injection 
        scope["user"] = user
        return await super().__call__(scope,receive,send)
