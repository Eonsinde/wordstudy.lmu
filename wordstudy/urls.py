from django.urls import path
from wordstudy import views
from django.urls import path, include

from rest_framework import routers
from accounts.views import ProfileViewSet

router = routers.DefaultRouter()

router.register(r'genres', views.GenreViewSet)
router.register(r'books', views.BookViewSet)
router.register(r'excos', views.ExcosViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'contact', views.ContactViewSet)
router.register(r'members', views.MemberViewSet)
router.register(r'prayer-request', views.PrayerBoxViewSet)

router.register(r'profile', ProfileViewSet)

urlpatterns = [
    # path('', views.index, name='home'),
    path('', include(router.urls)),
    path('home', views.index, name='home'),
    path('explore/', views.explore, name='explore'),
    # path('contact-us/', views.contact, name='contact'),
    path('join/', views.join, name='join'),
    path('search/', views.search, name='search'),
    path('details/<str:category>/', views.details, name='details'),
    path('excos/', views.excos, name='excos'),
    path('make-prayer-request/', views.prayerbox, name='prayerbox'),
]