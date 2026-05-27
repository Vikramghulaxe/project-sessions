from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly
)
from rest_framework.permissions import IsAuthenticated

from .models import Session
from .serializers import SessionSerializer
from .permissions import (
    IsCreator,
    IsSessionOwner    
)

class MySessionsView(
    generics.ListAPIView
):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Session.objects.filter(
            creator=self.request.user
        )


class SessionListCreateView(
    generics.ListCreateAPIView
):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_permissions(self):

        if self.request.method == "POST":
            return [IsCreator()]

        return [IsAuthenticatedOrReadOnly()]

    def perform_create(
        self,
        serializer
    ):
        serializer.save(
            creator=self.request.user
        )


class SessionDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_permissions(self):

        if self.request.method in [
            "PUT",
            "PATCH",
            "DELETE"
        ]:
            return [
                IsCreator(),
                IsSessionOwner()
            ]

        return [IsAuthenticatedOrReadOnly()]