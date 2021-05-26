# mysite/asgi.py
import os
from api.middlewares import TokenAuthMiddleware
from channels.auth import AuthMiddlewareStack
from channels.sessions import SessionMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import api.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoAPI.settings")

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": SessionMiddlewareStack(TokenAuthMiddleware(
        URLRouter(
            api.routing.websocket_urlpatterns
        )
    )),
})