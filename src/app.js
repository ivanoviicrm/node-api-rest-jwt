const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use('/api/v1', registerRoute);
app.use('/api/v1', loginRoute);


app.listen(process.env.APP_PORT, () => {
  console.log(`Application '${process.env.APP_NAME}' is running in development mode on http://localhost:${process.env.APP_PORT} ...`);
});