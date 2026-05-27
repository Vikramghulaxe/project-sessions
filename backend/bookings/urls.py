from django.urls import path
from .views import (
    BookingCreateView,
    UserBookingView,
    CreatorBookingView
)

urlpatterns = [
    path(
        "",
        BookingCreateView.as_view()
    ),
    path(
        "my/",
        UserBookingView.as_view()
    ),
    path(
        "creator/",
        CreatorBookingView.as_view()
    ),
]