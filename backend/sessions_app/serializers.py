from rest_framework import serializers
from .models import Session


class SessionSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(
        source="creator.username",
        read_only=True
    )

    class Meta:
        model = Session
        fields = "__all__"
        read_only_fields = [
            "creator"
        ]