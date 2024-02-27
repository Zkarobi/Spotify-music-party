from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() #return all of the different room objects
    serializer_class = RoomSerializer #convert this info into some format that can actually be used with serializer
