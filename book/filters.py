from rest_framework import filters


class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])


class DynamicOrderFilter(filters.OrderingFilter):
    def get_order_fields(self, view, request):
        return request.GET.getlist('order_fields', [])
