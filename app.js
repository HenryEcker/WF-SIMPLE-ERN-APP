const express = require('express');

const apiRouter = require('./routes/api');
const path = require("path");

const app = express();

// Serve React build first
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
// Serve api after
app.use('/api', apiRouter);

module.exports = app;
