from django.urls import path,include
from .views import TaskViewSet
from rest_framework.routers import DefaultRouter
#default router gives a root API endpoint.
routers = DefaultRouter()
routers.register(r'tasks',TaskViewSet,basename='task')

urlpatterns = [
  path('',include(routers.urls)),
]