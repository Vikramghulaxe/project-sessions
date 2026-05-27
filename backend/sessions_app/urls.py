from django.urls import path
from .views import (
    MySessionsView,
    SessionListCreateView,
    SessionDetailView
)

urlpatterns = [
    path(
        "",
        SessionListCreateView.as_view()
    ),

    path(
        "mine/",
        MySessionsView.as_view()
    ),

    path(
        "<int:pk>/",
        SessionDetailView.as_view()
    )
]