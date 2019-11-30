const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/private/profile');
const indexRoute = require('./routes/public/index');

// CONFIG VARIABLES
dotenv.config();

// MONGO DB CONNECTION
mongoose.connect(
  `mongodb://localhost/${process.env.DB_NAME}`, 
  {useUnifiedTopology: true, useNewUrlParser: true},
  () => console.log(`Connected to DB -> mongodb://localhost/${process.env.DB_NAME}`)
);

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use('/api/v1', authRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/index', indexRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Application '${process.env.APP_NAME}' is running in development mode on http://localhost:${process.env.APP_PORT} ...`);
});