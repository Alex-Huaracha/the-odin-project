import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import indexRouter from './routes/index.js';

const app = express();
app.disable('x-powered-by');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
