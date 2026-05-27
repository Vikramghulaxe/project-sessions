from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    session_title = serializers.CharField(
        source="session.title",
        read_only=True
    )

    creator_name = serializers.CharField(
        source="session.creator.username",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "session",
            "session_title",
            "creator_name",
            "created_at"
        ]