from django.test import TestCase
from .serializers import UserLoginSerializer, TweetSerializer, TwitterUserSerializer, TwitterFollowingSerializer, TwitterFollowerSerializer
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from django.contrib.auth.models import User

class ProductAPITests(APITestCase):


    def test_can_get_product_details(self):
        assert True

    def test_followers(self):
        client = APIClient()
        client.login(username='edgzoah', password='password')
        print(client)
        response = client.get('/api/profile/edgzoah/followers/')
        print(response)
        assert client

    # def test_can_update_product(self, django_app, product_factory):
    #     product = product_factory()
    #     response = django_app.patch_json(f'/products/{product.id}/update/', params={'name': 'Samsung Watch'})
    #     product.refresh_from_db()
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(product.name, 'Samsung Watch')