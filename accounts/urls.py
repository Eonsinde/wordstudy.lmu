from django.urls import path, include
from knox import views as knox_views
from accounts.views import *

# write your urlpatterns here


urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/user', UserAPI.as_view()),  # to retrieve a user detail for auth
    # path('auth/profile', ProfileAPI.as_view()),
    path('all-users', GetUsersAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]