# items/views.py
from rest_framework import viewsets, filters, permissions
from .models import Item
from .serializers import ItemSerializer
from rest_framework.response import Response
from rest_framework import status

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Item.objects.none()  # Required by DRF

    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'place', 'police', 'district', 'town']

    def get_queryset(self):
        """
        - type=MY_CREATION → only logged-in user's items
        - type=LOST/FOUND/THEFT/MISSING → public items for all users
        """
        item_type = self.request.query_params.get("type", None)

        if item_type == "MY_CREATION":
            return Item.objects.filter(user=self.request.user).order_by('-created_at')

        # Public items for all users
        qs = Item.objects.all().order_by('-created_at')

        if item_type and item_type != "MY_CREATION":
            qs = qs.filter(type=item_type.upper())

        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

  
def perform_destroy(self, instance):
    # Only allow deleting by the owner
    if instance.user != self.request.user:
        raise PermissionDenied("You do not have permission to delete this item")
    # Permanently delete from database
    instance.delete()