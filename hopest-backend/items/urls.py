# items/urls.py
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')

# Here we need to expose the list of URL patterns
urlpatterns = router.urls