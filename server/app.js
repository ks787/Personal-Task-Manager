const express = require('express');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Allow cross-origin requests from any origin for now to prevent CORS issues
app.use(cors());

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
