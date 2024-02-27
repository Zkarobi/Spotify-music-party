from django.db import models
import string
import random

#generate a unique code for Room
def generate_unique_code():
    length = 8

    while True:

        #ensures a random code with only uppercase letters and given length
        code = ''.join(random.choices(string.ascii_uppercase, k=length)) 

        #checks if the code is unique by filtering all the codes from Room() with the 
        #random generated code. after filtering, if that value is 0 
        #(i.e. no other room codes match generated code)
        #then, the code is unique and we can break
        if Room.objects.filter(code=code).count() == 0:
            break
        
    return code


# Create your models here.

#attributes of each room
class Room(models.Model):
    code = models.CharField(max_length=10, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
