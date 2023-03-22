from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('profile/<str:username>/', views.UserProfileView.as_view()),
    path('profile/<str:username>/followers/', views.UserFollowersView.as_view()),
    path('profile/<str:username>/following/', views.UserFollowingView.as_view()),
    path('home/following/', views.FollowingView.as_view()),
]