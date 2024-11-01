from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room, generate_unique_code
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() #return all of the different room objects
    serializer_class = RoomSerializer #convert this info into some format that can actually be used with serializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room)>0:
                data = RoomSerializer(room[0]).data
                data['is_host']=self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status = status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get(self.lookup.kwarg)
        if code != None:
            room_result=Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code']=code
                return Response ({'message':'Room Joined!'}, status=status.HTTP_200_OK)
            
            return Response ({'Bad Request':'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request':'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # Ensure a session is active
        if not request.session.exists(request.session.session_key):
            request.session.create()

        # Remove any existing room_code to avoid reuse
        if 'room_code' in request.session:
            del request.session['room_code']

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = request.session.session_key

            # Always create a new room with a unique room code
            room_code = generate_unique_code()
            room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip, code=room_code)
            room.save()

            # Set the new room code in the session
            request.session['room_code'] = room.code
            print("New room created with code:", room.code)  # Debug log

            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        room_code = self.request.session.get('room_code')
        print("Session room code:", room_code)  # Debug print
        data = {
            'code': room_code
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
