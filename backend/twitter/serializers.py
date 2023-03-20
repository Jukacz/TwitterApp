from rest_framework import serializers
from .models import Tweet, TwitterUser, Relationship
from django.contrib.auth.models import User

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('content', 'created_at')

class TwitterFollowingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='following.user.username')
    slug = serializers.CharField(source='following.slug')
    class Meta:
        model = Relationship
        fields = ('username', 'slug')

class TwitterFollowerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='follower.user.username')
    slug = serializers.CharField(source='follower.slug')
    class Meta:
        model = Relationship
        fields = ('username', 'slug')

class TwitterUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    class Meta:
        model = TwitterUser
        fields = ('username', 'slug')