from django.core.management.base import BaseCommand
from twitter.models import Tweet, Relationship, TwitterUser, Hashtag
from django.contrib.auth.models import User
from django.db.utils import IntegrityError

class Command(BaseCommand):
    help = 'Loads the database with some initial data'

    def handle(self, *args, **options):
        try:
            user1 = User.objects.create_user('edgzoah', 'adamoblady@gmail.com', 'password', first_name='Adam', last_name='Blady')
            user2 = User.objects.create_user('grubas', 'togrodnik2006@gmail.com', 'password', first_name='Tomasz', last_name='Ogrodnik')
            user3 = User.objects.create_user('oliwier', "oliwier@gmail.com", 'password', first_name='Oliwier', last_name='Bernatowicz')
            user1.save()
            user2.save()
            user3.save()
        except IntegrityError:
            self.stdout.write(self.style.ERROR('Users already exist in database'))
            return
        
        twitter_user1 = TwitterUser.objects.create(user=user1)
        twitter_user2 = TwitterUser.objects.create(user=user2)
        twitter_user3 = TwitterUser.objects.create(user=user3)

        tweet1 = Tweet.objects.create(user=twitter_user1, content='This is a tweet')
        tweet2 = Tweet.objects.create(user=twitter_user2, content='This is another tweet')
        tweet3 = Tweet.objects.create(user=twitter_user2, content='This is a third tweet')
        tweet4 = Tweet.objects.create(user=twitter_user2, content='This is a fourth tweet')
        tweet3 = Tweet.objects.create(user=twitter_user1, content='This is a fifth tweet #hashtag')
        tweet5 = Tweet.objects.create(user=twitter_user1, content='This is a sixth tweet @grubas')
        tweet6 = Tweet.objects.create(user=twitter_user3, content='This is a seventh tweet @edgzoah')
        tweet7 = Tweet.objects.create(user=twitter_user3, content='This is a eighth tweet @edgzoah')
        tweet1.save()
        tweet2.save()
        tweet3.save()
        tweet4.save()
        tweet5.save()
        tweet6.save()
        tweet7.save()

        hashtag = Hashtag.objects.create(name='hashtag')
        hashtag.save()

        relationship1 = Relationship.objects.create(follower=twitter_user1, following=twitter_user2)
        relationship2 = Relationship.objects.create(follower=twitter_user2, following=twitter_user1)
        relationship1.save()
        relationship2.save()

        self.stdout.write(self.style.SUCCESS('Successfully loaded database'))