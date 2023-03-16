from django.db import models
from django.contrib.auth.models import User

class TwitterUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.user.username
    
class Tweet(models.Model):
    user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

class Relationship(models.Model):
    follower = models.ForeignKey(TwitterUser, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(TwitterUser, on_delete=models.CASCADE, related_name='following')

    def __str__(self):
        return f'{self.follower} follows {self.following}'