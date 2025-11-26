# Task Management Platform

A modern Task Management web application built with **Django REST Framework (DRF)** and React.  
It allows users to create, update, and manage tasks efficiently with secure authentication and role-based access.

---

## 📝 Project Description

This project is a full-stack task management system. Features include:

- User registration and login
- CRUD operations for tasks
- Task assignment to users
- Audit logs for task actions
- RESTful API endpoints
- Interactive API documentation (Swagger & ReDoc)

---

## 🛠 Tech Stack

**Backend:**  
- Python 3.11+  
- Django 5.2  
- Django REST Framework (DRF)  
- drf-spectacular (OpenAPI 3 / Swagger docs)  
- PostgreSQL (for production)  

**Frontend:**  
- React.js  
- Tailwind CSS  

**Other Tools:**  
- Git / GitHub  
- Vercel / Render (for deployment)  

---

## ⚡ Setup Instructions

### Backend (Django)

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/task-management-platform.git
cd task-management-platform/server
```
2. **Create and activate a virtual environment**
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt

```
4. **Set up environment variables**

Create a .env file based on .env.example:
```bash
SECRET_KEY=your-django-secret-key
DEBUG=True
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

5. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Create superuser**
```bash
python manage.py createsuperuser
```

7. **Run the development server**
```bash
python manage.py runserver
```

## Frontend (React)

1. **Navigate to the client folder**
```bash
cd ../client
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the frontend server**
```bash
npm start
```
## API Documentation
```bash
The API is documented using drf-spectacular (Swagger & ReDoc).

Swagger UI (interactive): http://127.0.0.1:8000/api/docs/swagger/

ReDoc UI: http://127.0.0.1:8000/api/docs/redoc/

OpenAPI JSON schema: http://127.0.0.1:8000/api/schema/

All endpoints, parameters, request/response formats, and authentication details are available here.
```
## Environment Variables
```bash
Variable	Description
SECRET_KEY	Django secret key
DEBUG	True for development, False for production
DB_NAME	PostgreSQL database name
DB_USER	PostgreSQL user
DB_PASSWORD	PostgreSQL password
DB_HOST	Database host (default localhost)
DB_PORT	Database port (default 5432)
```
## Deployment Links
Frontend: http://task-management-platform-puce.vercel.app/

Backend API: https://task-management-platform-0r6h.onrender.com

## API Documentation
- **Development:** `http://127.0.0.1:8000/api/`
- **Production:** `https://task-management-platform-0r6h.onrender.com/api/`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/accounts/register/` | Register new user | ❌ No |
| POST | `/accounts/login/` | Login user and get JWT tokens | ❌ No |
| POST | `/accounts/logout/` | Logout user (blacklist refresh token) | ✅ Yes |
| POST | `/accounts/token/refresh/` | Refresh access token | ❌ No |
| GET | `/accounts/profile/` | Get current user profile | ✅ Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks/` | List all user's tasks (supports filters) | ✅ Yes |
| POST | `/tasks/` | Create new task | ✅ Yes |
| GET | `/tasks/{id}/` | Get specific task details | ✅ Yes |
| PUT | `/tasks/{id}/` | Update task (full update) | ✅ Yes |
| PATCH | `/tasks/{id}/` | Partial update task | ✅ Yes |
| DELETE | `/tasks/{id}/` | Delete task | ✅ Yes |
| GET | `/tasks/summary/` | Get task analytics summary | ✅ Yes |

### Audit Log Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/logs/` | List audit logs (paginated) | ✅ Yes |
| GET | `/logs/{id}/` | Get specific audit log entry | ✅ Yes |

---

### Query Parameters

**For `GET /api/tasks/`:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search in title and description | `?search=bug` |
| `status` | string | Filter by status | `?status=Pending` |
| `priority` | string | Filter by priority | `?priority=High` |
| `page` | integer | Page number for pagination | `?page=2` |
| `ordering` | string | Sort order | `?ordering=-created_at` |

### Example API Requests

#### Register User

**Request:**
```bash
POST /api/accounts/register/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "password2": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2024-11-25T10:30:00Z"
  },
  "message": "User registered successfully",
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

---

#### Login

**Request:**
```bash
POST /api/accounts/login/
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

#### Create Task

**Request:**
```bash
POST /api/tasks/
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "title": "Complete Documentation",
  "description": "Write comprehensive README for the project",
  "status": "Pending",
  "priority": "High"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Complete Documentation",
  "description": "Write comprehensive README for the project",
  "status": "Pending",
  "priority": "High",
  "owner": 1,
  "owner_email": "user@example.com",
  "created_at": "2024-11-25T10:35:00Z",
  "updated_at": "2024-11-25T10:35:00Z"
}
```

---

#### Get Tasks with Filters

**Request:**
```bash
GET /api/tasks/?status=Pending&priority=High&search=doc
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "count": 15,
  "next": "http://api.example.com/api/tasks/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Complete Documentation",
      "description": "Write comprehensive README for the project",
      "status": "Pending",
      "priority": "High",
      "owner": 1,
      "owner_email": "user@example.com",
      "created_at": "2024-11-25T10:35:00Z",
      "updated_at": "2024-11-25T10:35:00Z"
    }
    // ... more tasks
  ]
}
```

---

#### Get Analytics Summary

**Request:**
```bash
GET /api/tasks/summary/
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "total_tasks": 25,
  "completed": 12,
  "pending": 13,
  "high_priority": 8,
  "medium_priority": 10,
  "low_priority": 7
}
```

---

#### Get Audit Logs

**Request:**
```bash
GET /api/logs/?page=1
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "count": 50,
  "next": "http://api.example.com/api/logs/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": 1,
      "user_email": "user@example.com",
      "task": 5,
      "task_title": "Complete Documentation",
      "action": "Task Created",
      "changed_data": "{\"title\": \"Complete Documentation\", \"priority\": \"High\"}",
      "timestamp": "2024-11-25T10:35:00Z"
    }
    // ... more logs
  ]
}
```

---

## Screenshots 

<img width="777" height="669" alt="image" src="https://github.com/user-attachments/assets/aa3e69ff-84ff-4f60-a269-a7e3806423d2" />

<img width="838" height="881" alt="image" src="https://github.com/user-attachments/assets/8b71cfdc-9612-4480-9419-6bfd3dfbf356" />

<img width="1918" height="979" alt="image" src="https://github.com/user-attachments/assets/c2f1c738-1734-4c63-9915-0ec77d428df1" />

<img width="1918" height="979" alt="image" src="https://github.com/user-attachments/assets/e3c26a6d-149d-4274-a1da-33401f800899" />

<img width="1919" height="980" alt="image" src="https://github.com/user-attachments/assets/c2924049-86b7-49b4-b729-4c13330f72fb" />

<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/f44a3670-1dec-4382-8497-3846fb2c20b9" />






