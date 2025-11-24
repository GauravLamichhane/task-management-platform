from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response

class RegisterView(generics.CreateAPIView):
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]

  def create(self, request, *args, **kwargs):
    #check the application form
    #looks at self.serializer_class = RegisterSerializer
    #creates an instance RegisterSerializer(data = request.data)
    serializer = self.get_serializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    #create the new user
    user = serializer.save()

    #generate the jwt token
    refresh = RefreshToken.for_user(user)

    return Response({
      "user":UserSerializer(user).data,
      "message":"User Registered successfully",
      "tokens":{
        "refresh":str(refresh),
        "access":str(refresh.access_token),
      }
    },status = status.HTTP_201_CREATED)


class LogoutView(APIView):
  #must be logged in to logout
  permission_classes = [IsAuthenticated]
  def post(self, request):
    try:
        refresh_token = request.data.get("refresh")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveAPIView):
   serializer_class = UserSerializer
   permission_classes = [IsAuthenticated]

   def get_object(self):
      return self.request.user
