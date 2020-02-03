from django.urls import path
from wordstudy import views


urlpatterns = [
    path('', views.index, name='home'),
    path('explore/', views.explore, name='explore'),
    path('contact/', views.contact, name='contact'),
    path('join/', views.join, name='join'),
    path('search/', views.search, name='search'),
    path('details/<str:category>/', views.details, name='details'),
    path('excos/', views.excos, name='excos'),
    path('make-prayer-request/', views.prayerbox, name='prayerbox'),
]