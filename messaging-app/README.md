# Messaging App

A real-time messaging application built with React and Express.

## Stack

**Frontend:**

- React 19
- React Router
- Tailwind CSS
- Vite

**Backend:**

- Express 5
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs

## Setup

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository

2. Install dependencies:

```sh
cd server && npm install
cd ../client && npm install
```

3. Configure environment variables:

**server/.env:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/messaging_db"
JWT_SECRET="your-secret-key"
CLIENT_URL="http://localhost:5173"
PORT=3000
```

**client/.env:**

```env
VITE_API_URL="http://localhost:3000/api"
```

4. Run database migrations:

```sh
cd server
npx prisma migrate dev
```

5. Start the application:

```sh
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

## Features

- User authentication (signup/login)
- Real-time messaging with polling
- User list and conversation history
- Glassmorphism UI design

## API Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `GET /api/users` - Get all users
- `POST /api/messages` - Send message
- `GET /api/messages/:userId` - Get conversation

## License

ISC
