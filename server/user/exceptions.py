from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.views import exception_handler
from rest_framework.response import Response


def base_exception_handler(exc, context):
    return Response(data={'title': exc.default_code, 'description': exc.detail}, status=exc.status_code)
