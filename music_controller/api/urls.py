from django.urls import path
from . import views

urlpatterns = [
    path('home', views.main, name='main'),
    path('', views.main, name='main'),
]
