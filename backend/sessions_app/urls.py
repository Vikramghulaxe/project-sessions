from django.urls import path
from .views import (
    SessionListCreateView,
    SessionDetailView
)

urlpatterns = [
    path(
        "",
        SessionListCreateView.as_view()
    ),

    path(
        "<int:pk>/",
        SessionDetailView.as_view()
    )
]