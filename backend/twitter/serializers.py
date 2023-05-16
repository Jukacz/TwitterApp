from rest_framework import serializers
from .models import Tweet, TwitterUser, Relationship
from django.contrib.auth.models import User

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('content',)

class TwitterFollowingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='following.user.username')
    class Meta:
        model = Relationship
        fields = ('username',)

class TwitterFollowerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='follower.user.username')
    class Meta:
        model = Relationship
        fields = ('username',)