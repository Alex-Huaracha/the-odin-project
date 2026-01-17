import express from 'express';
import cors from 'cors';
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express();

// Disable X-Powered-By header for security
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Gym Blog API! 💪 ');
});

export default app;
