from rest_framework import serializers
from .models import Like, Tweet, TwitterUser, Relationship, Comment, Hashtag
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
    username = serializers.CharField(source='user.user.username')
    first_name = serializers.CharField(source="user.user.first_name")
    class Meta:
        model = Tweet
        fields = ('content', 'uuid', 'created_at', 'updated_at', 'username','first_name',  'like_count', 'comment_count')

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

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = ('follower', 'following')

class TweetDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('uuid',)

class CreateCommentSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(source='tweet.uuid')
    class Meta:
        model = Comment
        fields = ('content', 'uuid')

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.user.username')
    class Meta:
        model = Comment
        fields = ('content', 'uuid', 'created_at', 'updated_at', 'username')

class LikeSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(source='tweet.uuid')
    class Meta:
        model = Like
        fields = ('uuid',)

class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ('name', 'tweet_count')