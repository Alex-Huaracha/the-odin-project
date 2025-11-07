import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
app.disable('x-powered-by');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/catalog', categoryRoutes);
// app.use('/items', itemRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
