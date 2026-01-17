# The Speakeasy

A members-only clubhouse web application where users can write anonymous posts. Only members can see who wrote which post, and only admins can delete messages.

## 📋 About

This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum for learning Node.js, Express, and authentication.

## ✨ Features

- **User Authentication**: Sign up, log in, and log out functionality
- **Membership System**: Users can join the club with a secret passcode
- **Anonymous Posts**: Non-members see posts as anonymous
- **Member Privileges**: Members can see post authors and timestamps
- **Admin Controls**: Admins can delete any message
- **Secure**: Password hashing with bcrypt and session-based authentication

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **EJS** - Template engine
- **Passport.js** - Authentication middleware
- **Bcrypt** - Password hashing
- **Express Session** - Session management
- **Express Validator** - Input validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:

```bash
clone this repository
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/speakeasy_db
SESSION_SECRET=your-secret-key-here
MEMBER_PASSCODE=your-member-passcode
```

4. Initialize the database:

```bash
npm run db:init
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## 📝 Usage

1. **Sign Up**: Create a new account
2. **Log In**: Access your account
3. **View Messages**: See all posted messages (authors are anonymous to non-members)
4. **Join the Club**: Enter the secret passcode to become a member
5. **Create Messages**: Share your thoughts with other members
6. **Admin Features**: Admins can delete inappropriate messages

### Default Passcode

The default member passcode is set in your `.env` file as `MEMBER_PASSCODE`.

## 🔒 Security Features

- Passwords are hashed using bcrypt
- SQL injection prevention with parameterized queries
- Input validation and sanitization
- Session-based authentication
- CSRF protection ready

## 📜 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run db:init` - Initialize database tables
- `npm run db:seed` - Seed database with sample data

## 🤝 Contributing

This is a learning project from The Odin Project curriculum. Feel free to fork and experiment!

---

Built with ❤️ as part of The Odin Project
