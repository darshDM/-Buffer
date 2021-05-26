from urllib import parse
from django.db import close_old_connections
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from jwt import decode as jwt_decode
from django.conf import settings
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs
from channels.db import database_sync_to_async

@database_sync_to_async
def get_user(user_id):
    user = get_user_model().objects.get(id=user_id)
    return user

class TokenAuthMiddleware:
    def __init__(self,app):
        self.app = app

    async def __call__(self, scope, receive, send):
        close_old_connections()
        token = parse_qs(scope["query_string"].decode("utf-8"))["token"][0]

        try:
            UntypedToken(token)
        except(InvalidToken,TokenError) as e:
            return None
        else:
            decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # user = get_user_model().objects.get(id=decoded_data["user_id"])
            scope["user"] = await get_user(decoded_data["user_id"])
        return await self.app(scope, receive, send)

    