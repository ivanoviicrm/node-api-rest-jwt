const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');

// MONGO DB CONNECTION
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to DB -> mongodb://localhost/${process.env.DB_NAME}`);
});

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use('/api/v1', registerRoute);
app.use('/api/v1', loginRoute);


app.listen(process.env.APP_PORT, () => {
  console.log(`Application '${process.env.APP_NAME}' is running in development mode on http://localhost:${process.env.APP_PORT} ...`);
});