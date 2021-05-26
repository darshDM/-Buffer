from rest_framework import serializers
from .models import QueryThread
from django.contrib.auth.models import Group,User

class ServerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryThread
        fields = ('title',)