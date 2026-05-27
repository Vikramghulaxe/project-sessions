from django.db import models
from django.conf import settings


class Session(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sessions"
    )

    date = models.DateTimeField()

    duration = models.PositiveIntegerField(
        help_text="Duration in minutes"
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title