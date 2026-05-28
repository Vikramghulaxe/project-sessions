from django.core.management.base import BaseCommand

from django.contrib.auth import get_user_model

from sessions_app.models import Session

from datetime import timedelta

from django.utils import timezone

User = get_user_model()


class Command(BaseCommand):

    help = "Seed demo data"

    def handle(self, *args, **kwargs):

        creator, _ = User.objects.get_or_create(
            username="creator_demo",
            defaults={
                "email": "creator@test.com",
                "role": "CREATOR",
            }
        )

        creator.set_password("Password123")
        creator.save()

        user, _ = User.objects.get_or_create(
            username="user_demo",
            defaults={
                "email": "user@test.com",
                "role": "USER",
            }
        )

        user.set_password("Password123")
        user.save()

        if Session.objects.count() == 0:

            sessions = [

                {
                    "title": "React Masterclass",
                    "description": "Learn React from beginner to advanced level.",
                    "price": 499,
                    "duration": 90,
                },

                {
                    "title": "Docker for Developers",
                    "description": "Master Docker and containerized development.",
                    "price": 699,
                    "duration": 120,
                },

                {
                    "title": "Advanced Django REST APIs",
                    "description": "Build scalable APIs with DRF.",
                    "price": 799,
                    "duration": 100,
                },

                {
                    "title": "TypeScript Essentials",
                    "description": "Strongly typed frontend applications.",
                    "price": 399,
                    "duration": 80,
                },

                {
                    "title": "System Design Basics",
                    "description": "Learn scalable backend architecture.",
                    "price": 999,
                    "duration": 150,
                },

            ]

            for index, item in enumerate(sessions):

                Session.objects.create(

                    creator=creator,

                    title=item["title"],

                    description=item["description"],

                    price=item["price"],

                    duration=item["duration"],

                    date=timezone.now() + timedelta(days=index + 1)

                )

        self.stdout.write(
            self.style.SUCCESS(
                "Demo data seeded successfully"
            )
        )