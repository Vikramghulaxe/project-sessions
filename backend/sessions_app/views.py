from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly
)

from .models import Session
from .serializers import SessionSerializer
from .permissions import IsCreator


class SessionListCreateView(
    generics.ListCreateAPIView
):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_permissions(self):

        if self.request.method == "POST":
            return [IsCreator()]

        return [IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
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
            return [IsCreator()]

        return [IsAuthenticatedOrReadOnly()]