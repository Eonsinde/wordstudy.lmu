from accounts.serializers import *
from rest_framework import generics, viewsets
from rest_framework import permissions
from knox.auth import AuthToken
from rest_framework.response import Response
import json

# Create your views here.


class UserAPI(generics.RetrieveAPIView):
    """ to get the current authenticated user if token is still valid """
    serializer_class = UserSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        # permissions.IsAdminUser
    ]

    def get_object(self):
        return self.request.user


class ProfileAPI(viewsets.ModelViewSet):
    """ to edit, update and deactivate profile or account """

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):  # to view a user's profile
        user = User.objects.get(pk=pk)
        return Response(UserSerializer(user).data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):  # send auth token to update
        user = User.objects.get(pk=pk)
        if user.is_authenticated and (user == request.user):  # check to see if user id matches authenticated user id before deleting
            return Response({'message': 'Qualified to update'})
        return Response({'message': "Can't update someone else's profile"})

    def destroy(self, request, pk=None):  # send auth token to delete
        user = User.objects.get(pk=pk)
        if user.is_authenticated and (user == request.user):  # check to see if user id matches authenticated user id before deleting
            return Response({'message': 'Qualified to delete'})
        return Response({'message': 'Can\'t delete someone else\'s  profile'})


class RegisterAPI(generics.ListCreateAPIView):  # to create a user account
    """ to create a user account """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        # setup the form data manually
        form_data = {
            'username': request.data.get('username'),
            'password': request.data.get('password'),
            'email': request.data.get('email'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'profile': json.loads(request.data.get('profile'))
        }

        if request.data.get('actual-img') != 'null':
            form_data['profile']['image'] = request.data.get('actual-img')
        else:
            form_data['profile']['image'] = None

        serializer = UserSerializer(data=form_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_token = AuthToken.objects.create(user)
        token_config = {
            'auth_token': user_token[1],
            'expiry': user_token[0].expiry
        }
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token_config['auth_token']
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_token = AuthToken.objects.create(user)
        token_config = {
            'auth_token': user_token[1],
            'expiry': user_token[0].expiry
        }
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token_config['auth_token']
        })
