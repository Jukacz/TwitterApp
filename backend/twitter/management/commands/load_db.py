from django.core.management.base import BaseCommand
from twitter.models import Tweet, Relationship, TwitterUser, Hashtag, TweetHashtag
from django.contrib.auth.models import User
from django.db.utils import IntegrityError

class Command(BaseCommand):
    help = 'Loads the database with some initial data'

    def handle(self, *args, **options):
        try:
            user1 = User.objects.create_user('edgzoah', 'adamoblady@gmail.com', 'password', first_name='Adam', last_name='Blady')
            user2 = User.objects.create_user('grubas', 'togrodnik2006@gmail.com', 'password', first_name='Tomasz', last_name='Ogrodnik')
            user3 = User.objects.create_user('oliwier', "oliwier@gmail.com", 'password', first_name='Oliwier', last_name='Bernatowicz')
            user4 = User.objects.create_user('jacob', 'jacob2006@gmail.com', first_name='Kuba', last_name='Kłodnicki')
            user5 = User.objects.create_user('Adam', 'adam2006@gmail.com', first_name='Adam', last_name='Czyż')
            user6 = User.objects.create_user('Kaktus', 'doasod@gmail.com', 'password', first_name='Leon', last_name='Był')
            user7 = User.objects.create_user('piotrulla', 'dsadl@gmail.com', 'password', first_name='Piotr', last_name='Choinski')
            user8 = User.objects.create_user('aleksiej', 'ldsldaslda', 'password', first_name='Alex', last_name='Wiejak')
            user1.save()
            user2.save()
            user3.save()
            user4.save()
            user5.save()
            user6.save()
            user7.save()
            user8.save()
        except IntegrityError:
            self.stdout.write(self.style.ERROR('Users already exist in database'))
            return
        
        twitter_user1 = TwitterUser.objects.create(user=user1)
        twitter_user2 = TwitterUser.objects.create(user=user2)
        twitter_user3 = TwitterUser.objects.create(user=user3)
        twitter_user4 = TwitterUser.objects.create(user=user4)
        twitter_user5 = TwitterUser.objects.create(user=user5)
        twitter_user6 = TwitterUser.objects.create(user=user6)
        twitter_user7 = TwitterUser.objects.create(user=user7)
        twitter_user8 = TwitterUser.objects.create(user=user8)

        tweet1 = Tweet.objects.create(user=twitter_user1, content='This is a tweet')
        tweet2 = Tweet.objects.create(user=twitter_user2, content='This is another tweet')
        tweet3 = Tweet.objects.create(user=twitter_user2, content='This is a third tweet')
        tweet4 = Tweet.objects.create(user=twitter_user2, content='This is a fourth tweet')
        tweet3 = Tweet.objects.create(user=twitter_user1, content='This is a fifth tweet #hashtag')
        tweet5 = Tweet.objects.create(user=twitter_user1, content='This is a sixth tweet @grubas')
        tweet6 = Tweet.objects.create(user=twitter_user3, content='This is a seventh tweet @edgzoah')
        tweet7 = Tweet.objects.create(user=twitter_user3, content='This is a eighth tweet @edgzoah')
        tweet8 = Tweet.objects.create(user=twitter_user8, content='This is a ninth tweet @piotrulla')
        tweet9 = Tweet.objects.create(user=twitter_user6, content='Siema #kaktusik jestem xpp')
        tweet1.save()
        tweet2.save()
        tweet3.save()
        tweet4.save()
        tweet5.save()
        tweet6.save()
        tweet7.save()
        tweet8.save()
        tweet9.save()

        hashtag = Hashtag.objects.create(name='hashtag')
        hashtag2 = Hashtag.objects.create(name='kaktusik')
        hashtag.save()
        hashtag2.save()

        tweet_hashtag = TweetHashtag.objects.create(tweet=tweet3, hashtag=hashtag)
        tweet_hashtag2 = TweetHashtag.objects.create(tweet=tweet9, hashtag=hashtag2)
        tweet_hashtag.save()
        tweet_hashtag2.save()

        relationship1 = Relationship.objects.create(follower=twitter_user1, following=twitter_user2)
        relationship2 = Relationship.objects.create(follower=twitter_user2, following=twitter_user1)
        relationship3 = Relationship.objects.create(follower=twitter_user4, following=twitter_user7)
        relationship4 = Relationship.objects.create(follower=twitter_user5, following=twitter_user8)
        relationship1.save()
        relationship2.save()
        relationship3.save()
        relationship4.save()

        self.stdout.write(self.style.SUCCESS('Successfully loaded database'))