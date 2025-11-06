import express, { json } from 'express';
import { messagesRouter } from './routes/messages.js';

const app = express();
app.disable('x-powered-by');
app.use(json());

app.use('/', messagesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
