from rest_framework import serializers
from .models import Tweet, TwitterUser, Relationship
from django.contrib.auth.models import User

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.user.username')
    class Meta:
        model = Tweet
        fields = ('content', 'created_at', 'username')

class TwitterFollowingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='following.user.username')
    class Meta:
        model = Relationship
        fields = ('username')

class TwitterFollowerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='follower.user.username')
    class Meta:
        model = Relationship
        fields = ('username')