from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist
from django.db import models




class DefaultPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50


def get_objects_for_update(model: models.Model, detail: str, **args):
    try:
        return model.objects.select_for_update().get(
            **args)
    except ObjectDoesNotExist as e:
        raise NotFound(detail=detail)
