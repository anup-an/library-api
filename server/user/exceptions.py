from django.core.exceptions import PermissionDenied
from django.http import Http404
from rest_framework.response import Response
from rest_framework import exceptions


def base_exception_handler(exc, context):

    if isinstance(exc, exceptions.APIException):
        return Response(
            data={
                'title': exc.default_code,
                'description': exc.detail},
            status=exc.status_code)

    return Response(
        data={
            'title': 'error',
            'description': 'An error occurred'
        },
        status=500
    )
