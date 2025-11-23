import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROUTES (Placeholder) ---

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Messaging App API' });
});

// --- GLOBAL ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
