from uuid import uuid4
from django.db import models
from django.contrib.auth.models import User

class TwitterUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
class Tweet(models.Model):
    user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    is_deleted = models.BooleanField(default=False)
    like_count = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)

    def __str__(self):
        return self.content

class Comment(models.Model):
    user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid4, editable=False)

class Like(models.Model):
    user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)

class Relationship(models.Model):
    follower = models.ForeignKey(TwitterUser, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(TwitterUser, on_delete=models.CASCADE, related_name='following')

    def __str__(self):
        return f'{self.follower} follows {self.following}'