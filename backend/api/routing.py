from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path("ws/api/",ChatConsumer.as_asgi())
]