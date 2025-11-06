import express from 'express';

const app = express();
app.disable('x-powered-by');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/categories', categoryRoutes);
// app.use('/items', itemRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
