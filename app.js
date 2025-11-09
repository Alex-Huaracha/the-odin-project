import path from 'node:path';
import express from 'express';

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
