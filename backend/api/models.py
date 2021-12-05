from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.db.models.fields import CharField
from django.db.models.fields.related import ManyToManyField
from django.urls import reverse

User = get_user_model()

class QueryThread(models.Model):
    room = models.ForeignKey(Group,null=False,blank=False,on_delete=models.CASCADE)
    title = models.CharField(max_length=300,null=False)
    code = models.TextField(null=True)
    query = models.TextField(null=True)
    result = models.TextField(null=True,blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)                                                                                                
    closed = models.BooleanField(default=False)

    def __str__(self):
        return self.title 

class Message(models.Model):
    queryThread = models.ForeignKey(QueryThread,on_delete=models.CASCADE)
    sender = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    message = models.TextField()
    sended_at = models.DateTimeField(auto_now_add=True)
    code = models.TextField(null=True)
    
    def __str__(self):
        return self.message

def get_absolute_url(self):
    return reverse('join-room',args=[self.name])

Group.add_to_class('get_absolute_url',get_absolute_url)
Group.add_to_class('server_thumbnail',models.ImageField(null=True,upload_to='server-image'))
User.add_to_class('online',models.BooleanField(default=False))