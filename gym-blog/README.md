# Gym Blog API

A full-stack blog application for fitness content with separate client and admin interfaces.

## Project Structure

```
gym-blog-api/
├── backend/          # Express.js API with Prisma ORM
├── frontend-client/  # Public-facing React app
└── frontend-admin/   # Admin dashboard React app
```

## Tech Stack

**Backend:**

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- bcrypt for password hashing

**Frontend:**

- React 19 + Vite
- React Router
- Tailwind CSS 4

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gym_blog"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Seed the database (optional):

```bash
npx prisma db seed
```

This creates:

- Admin user: `admin` / `123456`
- Regular user: `gymrat` / `123456`
- Sample post with comment

6. Start the server:

```bash
npm run dev
```

API will be running at `http://localhost:3000`

### Frontend Client Setup

1. Navigate to the client directory:

```bash
cd frontend-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

Client will be running at `http://localhost:5173`

### Frontend Admin Setup

1. Navigate to the admin directory:

```bash
cd frontend-admin
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

Admin panel will be running at `http://localhost:5174`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Posts (Public)

- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get single post with comments

### Posts (Admin Only)

- `GET /api/posts/admin/all` - Get all posts (including drafts)
- `GET /api/posts/admin/:id` - Get post by ID (admin view)
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments (Authenticated Users)

- `POST /api/posts/:postId/comments` - Add comment to post

## Features

**Client App:**

- View published blog posts
- Read full articles with comments
- User registration and login
- Post comments (authenticated users only)

**Admin App:**

- Secure admin authentication
- Create, edit, and delete posts
- Manage post publication status
- View all posts (published and drafts)

## Database Schema

See [backend/prisma/schema.prisma](backend/prisma/schema.prisma) for the complete data model:

- **User**: Authentication and authorization
- **Post**: Blog articles with publication status
- **Comment**: User comments on posts

## Development

Run all three applications simultaneously in separate terminals for full-stack development.

## License

ISC
