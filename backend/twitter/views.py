from .serializers import UserLoginSerializer, TweetSerializer, TwitterFollowingSerializer, TwitterFollowerSerializer
from .models import TwitterUser, Tweet, Relationship
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED,
)

class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return Response(status=HTTP_200_OK, data={'username': user.username, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name, "success": True})
        return Response(None, status=HTTP_401_UNAUTHORIZED, data={'success': False})

class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(status=HTTP_200_OK, data={'success': True})

class FollowingView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        twitter_user = TwitterUser.objects.get(user=user)
        following = Relationship.objects.filter(follower=twitter_user)
        tweets = Tweet.objects.none()
        for f in following:
            tweets |= Tweet.objects.filter(user=f.following)
        data = self.serializer_class(tweets, many=True).data
        return Response({'tweets': data, 'success': True})

class UserProfileView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        twitter_user = TwitterUser.objects.get(user=user)
        tweets = Tweet.objects.filter(user=twitter_user)
        data = self.serializer_class(tweets, many=True).data
        return Response({'tweets': data, 'success': True})

class UserFollowersView(generics.GenericAPIView):
    serializer_class = TwitterFollowerSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        twitter_user = TwitterUser.objects.get(user=user)
        followers = Relationship.objects.filter(following=twitter_user)
        data = self.serializer_class(followers, many=True).data
        return Response({'followers': data, "success": True}, status=HTTP_200_OK)

class UserFollowingView(generics.GenericAPIView):
    serializer_class = TwitterFollowingSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        twitter_user = TwitterUser.objects.get(user=user)
        following = Relationship.objects.filter(follower=twitter_user)
        data = self.serializer_class(following, many=True).data
        return Response({'following': data, "success": True}, status=HTTP_200_OK)

class CreateRelationshipView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = get_object_or_404(User, id=request.data.get('user_id'))
        twitter_user = TwitterUser.objects.get(user=user)
        follower = TwitterUser.objects.get(user=request.user)
        relationship = Relationship(follower=follower, following=twitter_user)
        relationship.save()
        return Response(status=HTTP_200_OK, data={'success': True})
    
    def delete(self, request):
        user = get_object_or_404(User, id=request.data.get('user_id'))
        twitter_user = TwitterUser.objects.get(user=user)
        follower = TwitterUser.objects.get(user=request.user)
        relationship = Relationship.objects.get(follower=follower, following=twitter_user)
        relationship.delete()
        return Response(status=HTTP_200_OK, data={'success': True})

class CreateTweetView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = TwitterUser.objects.get(user=request.user)
        tweet = Tweet(user=user, content=request.data.get('content'))
        tweet.save()
        data = self.serializer_class(tweet).data
        return Response(data, status=HTTP_200_OK, data={'success': True})