from rest_framework import permissions


class MakeChangesOrCreateBook(permissions.BasePermission):
    """allows admin users only to create, update and delete Books"""

    def has_object_permission(self, request, view, obj):  # for object specific modification method like PUT, PATCH, DEL
        if request.method == "GET":  # i.e GET, HEAD, OPTIONS
            return True
        else:
            # if the request method is not in the SAFE methods list
            # then check to see if its an admin trying to access the unsafe methods
            return request.user.is_authenticated and request.user.is_staff

    def has_permission(self, request, view):  # for general method - only post and get really do get here
        if request.method == "GET":  # i.e GET, HEAD, OPTIONS
            return True
        else:
            # if the request method is not a GET req
            # then check to see if its an admin trying to access any other method
            return request.user.is_authenticated and request.user.is_staff




