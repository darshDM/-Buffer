from django.contrib import admin

from .models import QueryThread,Message

admin.site.register(QueryThread)
admin.site.register(Message)