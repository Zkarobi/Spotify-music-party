from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() #return all of the different room objects
    serializer_class = RoomSerializer #convert this info into some format that can actually be used with serializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        #the room code is randomly generated, so is created_at, and guests_can_pause and votes_to_skip is set by the host?
        #But, how do we identify the host?

        #checking if the current user has an active session with our web server
        #if it doesn't, we will have to create that session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            #check if there are any rooms in our database with same host that is trying to create a new room (indicated by session_key)
            queryset = Room.objects.filter(host=host)
            #if a another room exists with the same host, just grab the active room and update settings rather than creating a new room for the same session_key/host
            if queryset.exists(): #if room settings need to be updated
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip=votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else: #else, create a new room for new host/session key
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()

                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
