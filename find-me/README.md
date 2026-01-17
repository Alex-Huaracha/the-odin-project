# Find Me - Pokemon Edition

A "Where's Waldo?" style game featuring Pokemon characters. Find all hidden Pokemon as fast as you can and compete on the leaderboard.

## Features

- Interactive Pokemon search game
- Real-time timer
- Leaderboard system
- Responsive design

## Tech Stack

**Frontend:**

- React 19
- CSS3
- Vite

**Backend:**

- Node.js
- Express
- SQLite
- PrismaORM

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd find-me
```

### Install dependencies

**Backend:**

```bash
cd api
npm install
```

**Frontend:**

```bash
cd client
npm install
```

## Running the Application

### Start the backend server

```bash
cd api
npm start
```

Server runs on `http://localhost:3000`

### Start the frontend

```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`

## How to Play

1. Click anywhere on the image to open the character selection menu
2. Select the Pokemon you think you found
3. Find all 4 Pokemon as fast as possible
4. Submit your score to the leaderboard

## Game Characters

- Magikarp
- Weedle
- Seadra
- Magnemite

## Project Structure

```
find-me/
├── api/           # Backend server
│   ├── app.js     # Express server & API routes
│   └── db.js      # Database configuration
├── client/        # Frontend React app
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── assets/
└── README.md
```

## API Endpoints

- `POST /api/validate` - Validate character location
- `POST /api/scores` - Submit player score
- `GET /api/scores` - Get leaderboard (top 10)

## License

MIT
