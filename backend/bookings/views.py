from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Booking
from .serializers import BookingSerializer


class BookingCreateView(
    generics.CreateAPIView
):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        session = serializer.validated_data["session"]

        already_booked = Booking.objects.filter(
            user=self.request.user,
            session=session
        ).exists()

        if already_booked:
            raise ValidationError(
                "You already booked this session."
            )

        serializer.save(
            user=self.request.user
        )


class UserBookingView(
    generics.ListAPIView
):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user
        )


class CreatorBookingView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(
            "Current user:",
            self.request.user.id,
            self.request.user.username
        )

        return Booking.objects.filter(
            session__creator_id=self.request.user.id
        )