from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async  
from channels.db import database_sync_to_async
class ChatConsumer(AsyncJsonWebsocketConsumer): 

    async def connect(self):
        print(self.scope["user"].user_name)
        # await self.channel_layer.group_add("Python",self.channel_name)
        await self.accept()
    

    async def addGroup(self,group_name):
        await self.channel_layer.group_add(group_name,self.channel_name)

    @database_sync_to_async
    def getGroups(self):
        qs = self.scope["user"].groups.all()
        for grp in qs:            
            async_to_sync(self.addGroup)(str(grp.name))
        

    async def receive_json(self,content):
        print(content)
        if(content["command"] == 'initial'):
            await self.getGroups()
        elif(content["command"] == "chat_message"):
            await self.channel_layer.group_send(
                str(content['server']),
                {
                    "type": "chat.message",
                    "message": content["message"],
                }
            )
        

    async def chat_message(self, event):
    # Send a message down to the client
        print(event['message'])
        await self.send_json(
            {
                # "username": event["username"],
                "message": event["message"],
            },
        )
    @database_sync_to_async
    def removeGroups(self):
        qs = self.scope["user"].groups.all()
        # async_to_sync(self.channel_layer.group_add)("Python",self.channel_name)
        for grp in qs:            
            async_to_sync(self.channel_layer.group_discard)(grp.name,self.channel_name)

    async def disconnect(self,close_code):
        # await self.removeGroups()
        pass