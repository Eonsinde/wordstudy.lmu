from rest_framework import permissions
from django.contrib.auth.models import User


class MakeChangesOnUser(permissions.BasePermission):
    """allows admin users only to create, update and delete Books"""

    def has_permission(self, request, view):  # for general method - only post and get really do get here
        if request.method == "GET":  # i.e GET, HEAD, OPTIONS
            return request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff)
        elif request.method == 'POST':
            return request.user.is_authenticated and request.user.is_superuser
            # only super user - permit create to create user
        elif request.method == 'DELETE':
            incoming_user = User.objects.get(pk=view.kwargs['pk'])
            return (request.user.is_authenticated and request.user.is_superuser) or (
                (request.user.is_authenticated and (request.user == incoming_user))
            )
        elif request.method == 'PUT':
            incoming_user = User.objects.get(pk=view.kwargs['pk'])
            return (request.user.is_authenticated and request.user.is_superuser) or (
                (request.user.is_authenticated and (request.user == incoming_user))
            )
        elif request.method == 'PATCH':
            incoming_user = User.objects.get(pk=view.kwargs['pk'])
            return (request.user.is_authenticated and request.user.is_superuser) or (
                (request.user.is_authenticated and (request.user == incoming_user))
            )
        else:
            # then check to see if its an admin trying to access other unsafe methods
            return request.user.is_authenticated and request.user.is_superuser




