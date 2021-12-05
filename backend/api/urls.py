from django.urls import path
from .views import GetServers, MyServerList, GetThreads,CreateServerView, GetThreadMesseges


app_name="api"

urlpatterns = [
    path("get-server-list",GetServers.as_view()),
    path("my-server-list",MyServerList.as_view()),
    path("get-threads/<str:server>",GetThreads.as_view()),
    path("create-server",CreateServerView.as_view()),
    path("get-thread-messages/<int:id>",GetThreadMesseges.as_view()),
]