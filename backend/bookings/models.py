from django.db import models
from django.conf import settings
from sessions_app.models import Session


class Booking(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = ("user", "session")

    def __str__(self):
        return f"{self.user} - {self.session}"