from .serializers import UserLoginSerializer, TweetSerializer, LikeSerializer, HashtagSerializer, CommentSerializer, TwitterFollowingSerializer, CreateCommentSerializer, TweetDeleteSerializer, RelationshipSerializer, TwitterFollowerSerializer, UserRegisterSerializer
from .models import Comment, Like, TwitterUser, Tweet, Relationship, Hashtag, TweetHashtag
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
import re

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
                return Response(status=HTTP_200_OK, data={'user': {'username': user.username, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name }, "success": True})
        return Response(status=HTTP_401_UNAUTHORIZED, data={'success': False, 'error': 'Invalid credentials'})

class RegisterView(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.create(serializer.validated_data)
        except Exception as e:
            return Response(status=HTTP_400_BAD_REQUEST, data={'success': False, 'error': str(e)})
        twitter_user = TwitterUser(user=user)
        twitter_user.save()
        return Response(status=HTTP_200_OK, data={'success': True})

class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(status=HTTP_200_OK, data={'success': True})
    
class MyInformationsView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        data = {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
        }
        return Response(status=HTTP_200_OK, data={'success': True, "user": data })

class FollowingView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        twitter_user = TwitterUser.objects.get(user=user)
        following = Relationship.objects.filter(follower=twitter_user)
        tweets = Tweet.objects.none()
        for f in following:
            tweets |= Tweet.objects.filter(user=f.following, is_deleted=False).order_by('-created_at')
        data = self.serializer_class(tweets, many=True).data
        for tweet in data:
            tweet['already_liked'] = Like.objects.filter(user=twitter_user, tweet__uuid=tweet['uuid']).exists()
        return Response({'tweets': data, 'success': True})

class UserProfileView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        twitter_user = TwitterUser.objects.get(user=user)
        user_from_query = TwitterUser.objects.get(user=request.user)
        personal_informations = User.objects.get(username=username)
        tweets = Tweet.objects.filter(user=twitter_user, is_deleted=False).order_by('-created_at')
        count_followers = Relationship.objects.filter(following=twitter_user).count()
        count_following = Relationship.objects.filter(follower=twitter_user).count()
        are_you_follow_him = Relationship.objects.filter(follower=user_from_query, following=twitter_user).exists()
        data = self.serializer_class(tweets, many=True).data
        return Response({"profile": {'tweets': data, "count_following": count_following, "count_followers": count_followers,"following_already": are_you_follow_him,"first_name": personal_informations.first_name, "last_name": personal_informations.last_name}, 'success': True})

class UserFollowersView(generics.GenericAPIView):
    serializer_class = TwitterFollowerSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        twitter_user = TwitterUser.objects.get(user=user)
        followers = Relationship.objects.filter(following=twitter_user)
        data = self.serializer_class(followers, many=True).data
        count_followers = len(data)
        return Response({'followers': data, "followers_count": count_followers, "success": True}, status=HTTP_200_OK)

class UserFollowingView(generics.GenericAPIView):
    serializer_class = TwitterFollowingSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        twitter_user = TwitterUser.objects.get(user=user)
        following = Relationship.objects.filter(follower=twitter_user)
        data = self.serializer_class(following, many=True).data
        count_following = len(data)
        return Response({'following': data, "following_count": count_following, "success": True}, status=HTTP_200_OK)

class CreateRelationshipView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RelationshipSerializer

    def post(self, request):
        follower = TwitterUser.objects.get(user=request.user)
        following = get_object_or_404(TwitterUser, user__id=request.data.get('follower'))
        if Relationship.objects.filter(follower=follower, following=following).exists():
            return Response(status=HTTP_400_BAD_REQUEST, data={'success': False, 'error': 'Already following'})
        
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            return Response(status=HTTP_400_BAD_REQUEST, data={'success': False, 'error': str(e)})
        return Response(status=HTTP_200_OK, data={'success': True})

    def delete(self, request):
        follower = TwitterUser.objects.get(user=request.user)
        following = get_object_or_404(TwitterUser, user__id=request.data.get('follower'))
        relationship = get_object_or_404(Relationship, follower=follower, following=following)
        relationship.delete()
        return Response(status=HTTP_200_OK, data={'success': True})        


class CreateTweetView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = TwitterUser.objects.get(user=request.user)
        content = request.data.get('content')
        tweet = Tweet(user=user, content=content)
        tweet.save()
        if '#' in content:
            hashtags = re.findall(r"#(\w+)", content)
            for hashtag in hashtags:
                try:
                    hashtag_obj = Hashtag.objects.get(name=hashtag)
                except Hashtag.DoesNotExist:
                    hashtag_obj = Hashtag.objects.create(name=hashtag)
                hashtag_obj.tweet_count += 1
                hashtag_obj.save()
                tweethashtag = TweetHashtag(tweet=tweet, hashtag=hashtag_obj)
                tweethashtag.save()
        data = self.serializer_class(tweet).data
        return Response({'tweet': data, 'success': True}, status=HTTP_200_OK)
    
class DeleteTweetView(generics.GenericAPIView):
    serializer_class = TweetDeleteSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tweet = get_object_or_404(Tweet, uuid=request.data.get('uuid'))
        tweet.is_deleted = True
        tweet.save()
        return Response(status=HTTP_200_OK, data={'success': True})

class TweetView(generics.GenericAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, uuid):
        tweet = get_object_or_404(Tweet, uuid=uuid)
        comments = Comment.objects.filter(tweet=tweet, is_deleted=False).order_by('-created_at')
        comments = [{'username': c.user.user.username, 'content': c.content, 'created_at': c.created_at} for c in comments]
        data = self.serializer_class(tweet).data
        return Response(status=HTTP_200_OK, data={'tweet': data, 'comments': comments, 'success': True})

class CommentView(generics.GenericAPIView):
    serializer_class = CreateCommentSerializer
    permission_classes = (IsAuthenticated,)

    def post(self,request, uuid):
        tweet = get_object_or_404(Tweet, uuid=uuid)
        user = TwitterUser.objects.get(user=request.user)
        comment = Comment(user=user, tweet=tweet, content=request.data.get('content'))
        comment.save()
        tweet.comment_count += 1
        tweet.save()
        data = CommentSerializer(comment).data
        return Response(status=HTTP_200_OK, data={'comment': data, 'success': True})
    
    def get(self, request, uuid):
        tweet = get_object_or_404(Tweet, uuid=uuid)
        comments = Comment.objects.filter(tweet=tweet, is_deleted=False).order_by('-created_at')
        comments = [{'username': c.user.user.username, 'first_name': c.user.user.first_name, 'content': c.content, 'created_at': c.created_at} for c in comments]
        return Response(status=HTTP_200_OK, data={'comments': comments, 'success': True})
    
    def delete(self, request):
        tweet = get_object_or_404(Tweet, uuid=request.data.get('uuid'))
        user = TwitterUser.objects.get(user=request.user)
        comment = get_object_or_404(Comment, tweet=tweet, user=user)
        comment.is_deleted = True
        comment.save()
        tweet.comment_count -= 1
        tweet.save()
        return Response(status=HTTP_200_OK, data={'success': True})

class LikeView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LikeSerializer

    def post(self, request):
        tweet = get_object_or_404(Tweet, uuid=request.data.get('uuid'))
        user = TwitterUser.objects.get(user=request.user)
        found_like = Like.objects.filter(tweet=tweet, user=user)
        if found_like.exists():
            try:
                found_like.delete()
                tweet.like_count -= 1
                tweet.save()
                return Response(status=HTTP_200_OK, data={'success': True, 'type': 'unlike'})
            except Exception as e:
                return Response(status=HTTP_400_BAD_REQUEST, data={'success': False, 'error': str(e)})
        like = Like(tweet=tweet, user=user)
        like.save()
        tweet.like_count += 1
        tweet.save()
        return Response(status=HTTP_200_OK, data={'success': True, 'type': 'like'})

    def delete(self, request):
        tweet = get_object_or_404(Tweet, uuid=request.data.get('uuid'))
        user = TwitterUser.objects.get(user=request.user)
        like = get_object_or_404(Like, tweet=tweet, user=user)
        like.delete()
        tweet.like_count -= 1
        tweet.save()
        return Response(status=HTTP_200_OK, data={'success': True})

class HashtagView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = HashtagSerializer

    def get(self, request, name):
        hashtag = get_object_or_404(Hashtag, name=name)
        tweets = TweetHashtag.objects.filter(hashtag=hashtag).order_by('-tweet__created_at')
        tweets = [{'username': t.tweet.user.user.username, 'content': t.tweet.content, 'created_at': t.tweet.created_at} for t in tweets]
        return Response(status=HTTP_200_OK, data={'tweets': tweets, 'success': True})
