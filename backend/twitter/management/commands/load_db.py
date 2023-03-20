from django.core.management.base import BaseCommand
from twitter.models import Tweet, Relationship, TwitterUser
from django.contrib.auth.models import User
from django.db.utils import IntegrityError

class Command(BaseCommand):
    help = 'Loads the database with some initial data'

    def handle(self, *args, **options):
        try:
            user1 = User.objects.create_user('edgzoah', 'adamoblady@gmail.com', 'password', first_name='Adam', last_name='Blady')
            user2 = User.objects.create_user('grubas', 'togrodnik2006@gmail.com', 'password', first_name='Tomasz', last_name='Ogrodnik')
            user1.save()
            user2.save()
        except IntegrityError:
            self.stdout.write(self.style.ERROR('Users already exist in database'))
            return
        
        twitter_user1 = TwitterUser.objects.create(user=user1, slug='edgzoah')
        twitter_user2 = TwitterUser.objects.create(user=user2, slug='grubas')

        tweet1 = Tweet.objects.create(user=twitter_user1, content='This is a tweet')
        tweet2 = Tweet.objects.create(user=twitter_user2, content='This is another tweet')
        tweet1.save()
        tweet2.save()

        relationship1 = Relationship.objects.create(follower=twitter_user1, following=twitter_user2)
        relationship2 = Relationship.objects.create(follower=twitter_user2, following=twitter_user1)
        relationship1.save()
        relationship2.save()

        self.stdout.write(self.style.SUCCESS('Successfully loaded database'))