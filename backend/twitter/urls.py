from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('my-informations/', views.MyInformationsView.as_view()),
    path('profile/<str:username>/', views.UserProfileView.as_view()),
    path('profile/<str:username>/followers/', views.UserFollowersView.as_view()),
    path('profile/<str:username>/following/', views.UserFollowingView.as_view()),
    path('home/following/', views.FollowingView.as_view()),
    path('home/tweets/', views.TweetsView.as_view()),
    path('relationship/', views.CreateRelationshipView.as_view()),
    path('create-tweet/', views.CreateTweetView.as_view()),
    path('delete-tweet/', views.DeleteTweetView.as_view()),
    path('tweet/<uuid:uuid>/', views.TweetView.as_view()),
    path('comment/<uuid:uuid>/', views.CommentView.as_view()),
    path('like/', views.LikeView.as_view()),
    path('hashtag/<str:hashtag>/', views.HashtagView.as_view()),
]