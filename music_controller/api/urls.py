from django.urls import path
from . import views

urlpatterns = [
    path('room', views.RoomView.as_view(), name='room_view'),
    path('create-room', views.CreateRoomView.as_view(), name='create_room_view'),
    path('get-room', views.GetRoom.as_view(), name='get_room'),
    path('join-room', views.JoinRoom.as_view(), name='join_room_view'),
    path('user-in-room', views.UserInRoom.as_view(), name='user_in_room_view')
]

