const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth/auth');

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
app.use('/api/v1', authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Application '${process.env.APP_NAME}' is running in development mode on http://localhost:${process.env.APP_PORT} ...`);
});