from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter , OrderingFilter
from .models import Task
from .filters import TaskFilter
from .serializers import TaskSerializer, TaskCreateUpdateSerializer
from django.db.models import Count, Q
from rest_framework.decorators import action
from rest_framework.response import Response

class TaskViewSet(viewsets.ModelViewSet):
  serializer_class = TaskSerializer
  permission_classes = [IsAuthenticated, IsOwner]
  filterset_class = TaskFilter
  search_fields = ['title','description']
  ordering_fields = ['created_at','updated_at','priority']
  ordering = ['-created_at']


  def get_queryset(self):
    return Task.objects.filter(owner = self.request.user)
  
  #this is a smart serializer 
  def get_serializer_class(self):
    if self.action in ['create','update','partial_update']:
      return TaskCreateUpdateSerializer
    return TaskSerializer
  
  #it automatically sets the task owner to the currently logged in user before saving to the database
  def perform_create(self, serializer):
    serializer.save(owner = self.request.user)
  
  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    task = serializer.save(owner = request.user)

    #convert this saved task into taskserializer to return full data
    response_serializer = TaskSerializer(task)
    return Response(response_serializer.data,status = status.HTTP_201_CREATED)
  
  def update(self, request, *args, **kwargs):
    #if user sends-> PATCH then DRF sets partial->True ,if PUT set False
    partial = kwargs.pop('partial',False)
    instance = self.get_object()#retrives task object from DB with the given id
    serializer = self.get_serializer(
      instance,
      data = request.data,
      partial = partial
    )
    serializer.is_valid(raise_exception = True)#raise 404 if invalid
    task = serializer.save()

    response_serializer = TaskSerializer(task)
    return Response(response_serializer.data)
  

  def destroy(self, request, *args, **kwargs):
    instance = self.get_object()
    self.perform_destroy(instance)
    return Response(
      {"message":"Task deleted successfully"},
      status =status.HTTP_200_OK
    )
  
  #detail = false -> is a collection route not related to specific task ID -> GET /api/tasks/summary/
  @action(detail=False,methods=['get'],url_path='summary')
  def summary(self,request):
    #queryset = Task.objects.filter(owner=request.user)

    from django.db.models import Count, Q
    queryset = self.get_queryset()
    total_tasks = queryset.count()
    completed = queryset.filter(status='Completed').count()
    pending = queryset.filter(status='Pending').count()
    high_priority = queryset.filter(priority='High').count()
    medium_priority = queryset.filter(priority='Medium').count()
    low_priority = queryset.filter(priority='Low').count()

    return Response({
            "total_tasks": total_tasks,
            "completed": completed,
            "pending": pending,
            "high_priority": high_priority,
            "medium_priority": medium_priority,
            "low_priority": low_priority,
        })