from django.forms.models import model_to_dict
from rest_framework import serializers
from .models import Message, QueryThread
from django.contrib.auth.models import Group,User
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','profilePic')


class ServerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name','id','server_thumbnail')

class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryThread
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    class Meta:
        model = Message
        fields = ['queryThread','sender','message','sended_at']
        # depth = 1