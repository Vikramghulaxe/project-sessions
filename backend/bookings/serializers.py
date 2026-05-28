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

    session_date = serializers.CharField(
        source="session.date",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = [
            "user"
        ]