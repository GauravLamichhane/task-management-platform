from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
  #write_only= True -> accept input but never returned in API  response
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True)

  class Meta:
    model = User
    fields = ['email','password','password2','first_name','last_name']
    #extra_kwargs allow us to override default behaviour without rewriting fields
    #i.e modifying existing models
    extra_kwargs = {
      'first_name':{'required':False},
      'last_name':{'required':False},
    }

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({"password":"Password fields didn't match."})
    return attrs
  
  def validate_email(self,value):
    if User.objects.filter(email = value).exists():
      raise serializers.ValidationError("A user with this email already exists")
    return value
  
  def create(self, validated_data):
    #no need to save password in DB
    validated_data.pop('password2')
    user = User.objects.create_user(
      #we are not allowding username so we set username = email for login purpose
      username=validated_data['email'],
      email= validated_data['email'],
      password=validated_data['password'],
      first_name = validated_data.get('first_name',''),
      last_name = validated_data.get('last_name','')
    )
    return user
  
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id','username','email','first_name','last_name','date_joined']
    #field cant be updated by user only returned
    read_only_fields = ['id','date_joined']