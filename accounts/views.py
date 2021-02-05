from accounts.serializers import *
from rest_framework import generics, viewsets
from rest_framework import permissions
from knox.auth import AuthToken
from rest_framework.response import Response
from accounts.permissions import *
import json

# Create your views here.


class UserAPI(generics.RetrieveAPIView):
    """ to get the current authenticated user if token is still valid """
    serializer_class = UserSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class GetUsersAPI(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    serializer_class = UserSerializer
    queryset = User.objects.all()


class ProfileViewSet(viewsets.ModelViewSet):
    """ to edit, update and deactivate profile or account """
    permission_classes = (MakeChangesOnUser, )

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def partial_update(self, request, *args, **kwargs):
        form_data = {}
        if request.data.get('username'):
            form_data['username'] = request.data.get('username')
        if request.data.get('email'):
                form_data['email'] = request.data.get('email')
        if request.data.get('password'):
            form_data['password'] = request.data.get('password')
        if request.data.get('first_name'):
            form_data['first_name'] = request.data.get('first_name')
        if request.data.get('last_name'):
            form_data['last_name'] = request.data.get('last_name')
        if request.data.get('actual-img'):
            form_data['profile'] = {
                'image': request.data.get('actual-img')
            }
        if request.data.get('phone_no'):
            form_data['profile'] = {
                'phone_no': request.data.get('phone_no')
            }

        serializer = UserSerializer(User.objects.get(pk=kwargs.get('pk')), data=form_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = User.objects.get(pk=kwargs.get('pk'))
        print("User to delete", user)
        user.delete()
        return Response({'message': 'Deleted'})


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
            # i used a conditional statement just in case i was using postman
            'profile': request.data.get('profile') if type(request.data.get('profile')) == dict else json.loads(request.data.get('profile'))
        }

        if request.data.get('actual-img') != 'null':
            form_data['profile']['image'] = request.data.get('actual-img')
        else:
            form_data['profile']['image'] = None

        serializer = UserSerializer(data=form_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response((UserSerializer(user, context=self.get_serializer_context()).data))


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
