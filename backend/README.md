# Backend - Ocean Sessions Marketplace

Backend API built with Django REST Framework and PostgreSQL.

---

# Features

* JWT Authentication
* Google OAuth verification
* Role-based access
* Session management
* Booking APIs
* Profile APIs
* Avatar uploads
* PostgreSQL integration

---

# Tech Stack

* Django
* Django REST Framework
* PostgreSQL
* Simple JWT
* Docker

---

# Run Backend

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Migrations

```bash
python manage.py migrate
```

---

## Start Server

```bash
python manage.py runserver
```

---

# Environment Variables

Create:

```bash
.env
```

Add:

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

SECRET_KEY=

GOOGLE_CLIENT_ID=
```

---

# API Endpoints

## Authentication

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /api/auth/register/       |
| POST   | /api/auth/login/          |
| POST   | /api/auth/google/         |
| GET    | /api/auth/profile/        |
| PATCH  | /api/auth/profile/update/ |

---

## Sessions

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/sessions/     |
| GET    | /api/sessions/:id/ |
| POST   | /api/sessions/     |
| PATCH  | /api/sessions/:id/ |
| DELETE | /api/sessions/:id/ |

---

## Bookings

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | /api/bookings/         |
| GET    | /api/bookings/my/      |
| GET    | /api/bookings/creator/ |

---

# Media Uploads

Uploaded avatars are served from:

```txt
/media/
```

---

# Docker

The backend runs inside Docker and connects to PostgreSQL using Docker Compose.
