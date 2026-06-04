const express = require('express');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Allow cross-origin requests from the React dev server (or deployed frontend)
let allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
if (allowedOrigin.endsWith('/')) {
  allowedOrigin = allowedOrigin.slice(0, -1);
}
app.use(cors({ origin: allowedOrigin }));

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
