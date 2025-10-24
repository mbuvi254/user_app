# User Management API

A RESTful API built with Express.js and Prisma ORM for managing user data with SQL Server database.

## 🚀 Features

- **CRUD Operations**: Complete user management functionality
- **Soft Delete**: Users are marked as deleted instead of being permanently removed
- **Database ORM**: Prisma for type-safe database operations
- **Auto-reload**: Nodemon for development hot-reloading

## 📋 Prerequisites

- Node.js (v14 or higher)
- SQL Server (running on localhost:1433)
- npm or yarn package manager

## 🛠️ Tech Stack

- **Express.js** v5.1.0 - Web framework
- **Prisma** v6.18.0 - ORM for database operations
- **SQL Server** - Database
- **Nodemon** - Development auto-reload
- **Chalk** - Terminal styling

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user_app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="sqlserver://localhost:1433;database=users_db;user=SA;password=YOUR_PASSWORD;trustServerCertificate=true;"
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma Client:
```bash
npx prisma generate
```

## 🚦 Running the Application

### Development Mode
```bash
npm run start-server
```
or
```bash
npx nodemon server.js
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Get All Users
```http
GET /users
```
**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isDeleted": false,
    "createdAt": "2024-10-24T10:30:00.000Z",
    "updatedAt": "2024-10-24T10:30:00.000Z"
  }
]
```

### Create New User
```http
POST /users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```
**Response:**
```json
{
  "message": "User Created Successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isDeleted": false,
    "createdAt": "2024-10-24T10:30:00.000Z",
    "updatedAt": "2024-10-24T10:30:00.000Z"
  }
}
```

### Get User by ID
```http
GET /users/:id
```

### Update User
```http
PATCH /users/:id
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```
**Response:**
```json
{
  "message": "User Updated Success",
  "data": {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "isDeleted": false,
    "createdAt": "2024-10-24T10:30:00.000Z",
    "updatedAt": "2024-10-24T11:00:00.000Z"
  }
}
```

### Delete User (Soft Delete)
```http
DELETE /users/:id
```
**Response:**
```json
{
  "message": "User Marked as deleted successfully",
  "user": {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "isDeleted": true,
    "createdAt": "2024-10-24T10:30:00.000Z",
    "updatedAt": "2024-10-24T11:30:00.000Z"
  }
}
```

## 🗄️ Database Schema

### User Model
| Field | Type | Constraints |
|-------|------|-------------|
| id | Int | Primary Key, Auto-increment |
| firstName | String | Required |
| lastName | String | Required |
| email | String | Required, Unique |
| isDeleted | Boolean | Default: false |
| createdAt | DateTime | Auto-generated |
| updatedAt | DateTime | Auto-updated |

## 🔧 Project Structure

```
user_app/
├── prisma/
│   ├── migrations/        # Database migrations
│   └── schema.prisma      # Prisma schema definition
├── node_modules/          # Dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project metadata and scripts
├── server.js             # Main application file
└── README.md             # This file
```

## 🐛 Troubleshooting

### Database Connection Issues
If you encounter `Can't reach database server` errors:
1. Ensure SQL Server is running: `systemctl status mssql-server`
2. Verify credentials in `.env` file
3. Check if the database exists: `sqlcmd -S localhost -U SA -P 'YOUR_PASSWORD' -C -Q "SELECT name FROM sys.databases"`

### Module Type Warning
If you see module type warnings, ensure `"type": "module"` is in `package.json`.

## 📝 License

ISC

## 👤 Author

Daniel Mulatya

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
