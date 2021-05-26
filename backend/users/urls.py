from django.urls import path
from .views import  BlacklistTokenUpdateView,CheckView

app_name="users"
urlpatterns=[
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),name='blacklist'),
    path('check/',CheckView.as_view()),
]