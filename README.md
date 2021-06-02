## Channels

Project enables you to ask your code queries in classified way with real-time chat options
Fundamental unit here is "Channels", Each channel is associated with specific compiler, interpreter 
and with some set of libraries installed by admin of channel

### Tech and Tools

HTTP is used to perform initial fetch of data and Authentication \
Websockets are used for Chat and Notification \
For Backend operation Django Rest Framework is used along with django-channels for async tasks \
For Frontend ReactJS is used \
PostgreSQl is used as Database (might migrate to mongoDB or any NoSql) \
Redis is used as channel Layer (In-memory database) \

### Features to-do List

- [x] Basic Authentication
- [x] Create Channel
- [ ] Create Thread
- [ ] Join Channel
- [ ] Better UI
- [ ] Social Authentications
- [ ] Async Messeging
- [ ] Notifications
- [ ] Code Compilation and Output

## Running Web-app

Clone Repo \
Go into backend folder(to start backend server) \
```
cd backend
```
Create virtual environment \
```
virtualenv env
```
Activate virtual environment(search up for specific OS) \
```
activate bin/Scripts/activate
```
Install Dependencies
```
pip install -r requirements.txt
```

do all stuff related to Django like migrations and all
```
py manage.py migrate
py manage.py runserver
```

To work with websocket install redis or use docker
```
docker run -d --name redis -p 6379:6379 redis:5
```

Follow-up steps in readme file from frontend folder to start server for frontend

Note
> Configure your database in settings.py \
> create Admin user to view tables on admin page 







