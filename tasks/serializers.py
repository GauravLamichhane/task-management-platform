from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
  #owner is the fk in the task model pointing to user so owner.email
  owner_email = serializers.EmailField(source = 'owner.email',read_only = True)

  class Meta:
    model = Task
    #fields allowed in the API
    fields = ['id','title','description','status','priority','owner','owner_email','created_at','updated_at']
    #cant be edited only can be seen
    read_only_fields = ['id','owner','created_at','updated_at']
  
  def create(self, validated_data):
    #owner will be set in this view
    return super().create(validated_data)
  
class TaskCreateUpdateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ['title','description','status','priority']

  def validate_title(self,value):
    if len(value) < 3:
      raise serializers.ValidationError("title must be at least 3 characters long")
    return value
  

#use extra_kwargs for modifying the existing model fields
#use explict fields for creating new fields that dont exist in model.