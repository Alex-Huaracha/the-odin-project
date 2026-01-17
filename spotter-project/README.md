# Spotter Project

A full-stack social media platform for fitness enthusiasts to share workouts, connect with gym buddies, and track their fitness journey.

## Tech Stack

**Frontend:**

- React 19 with Vite
- TailwindCSS 4
- React Router DOM
- Axios & React Hook Form
- Lucide React (icons)

**Backend:**

- Node.js with Express 5
- Prisma ORM with PostgreSQL
- Passport.js (Local Strategy)
- Zod (validation)
- bcryptjs (password hashing)

## Features

- 🔐 Authentication (register, login, session-based)
- 📝 Create, edit, delete posts (280 char limit)
- 💬 Comment on posts (threaded replies)
- ❤️ Like/unlike posts and comments
- 👤 User profiles with customizable bio, goals, and avatar
- 👥 Follow/unfollow users
- 📰 Personalized feed with posts from followed users
- 🔍 User suggestions (who to follow)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Alex-Huaracha/spotter-project.git
cd spotter-project
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/spotter"
SESSION_SECRET="your-secret-key-here"
PORT=3000
NODE_ENV=development
```

Run Prisma migrations and seed the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in `client`:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

## Default Credentials

After seeding the database, you can log in with:

- **Username:** `guest`
- **Password:** `123456`

## API Endpoints

**Auth:**

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

**Posts:**

- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post by ID
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `DELETE /api/posts/:id/like` - Unlike post

**Users:**

- `GET /api/users/:username` - Get user profile
- `GET /api/users/:username/posts` - Get user posts
- `PATCH /api/users/profile` - Update profile
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user
- `GET /api/users/suggestions` - Get user suggestions

## Database Schema

- **User**: username, email, password, bio, gymGoals, avatarUrl
- **Post**: content, authorId, parentId (for replies)
- **Like**: userId, postId
- **Follows**: followerId, followingId

## Scripts

**Server:**

- `npm run dev` - Start with nodemon
- `npm start` - Start production server

**Client:**

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

ISC

## Author

Alex Huarcha
