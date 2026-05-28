import os

from rest_framework import generics
from .models import User
from .serializers import (
    UserSerializer,
    RegisterSerializer
)



from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    



class GoogleLoginView(APIView):

    def post(self, request):

        try:

            token = request.data.get(
                "token"
            )

            print("TOKEN:", token)

            info = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                os.getenv(
                    "GOOGLE_CLIENT_ID"
                )
            )

            print("INFO:", info)

            email = info["email"]

            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username":
                    email.split("@")[0]
                }
            )

            refresh = RefreshToken.for_user(
                user
            )

            return Response({

                "access":
                str(refresh.access_token),

                "refresh":
                str(refresh)

            })

        except Exception as e:

            print("GOOGLE ERROR:", str(e))

            return Response(
                {
                    "error":
                    str(e)
                },
                status=400
            )