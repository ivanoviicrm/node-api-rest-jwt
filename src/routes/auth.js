const router = require('express').Router();
const userModel = require('../models/User');
const dotenv = require('dotenv').config();
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { registerValidationsSchema, loginValidationsSchema } = require('../validations/auth');
const bcrypt = require('bcryptjs');

// URL -> http://localhost:PORT/api/v1/register
router.post('/register', async (req, res) => {
    // Validating the data
    const validation = registerValidationsSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    }

    // Check if user already exists
    try {
      const emailAlreadyExist = await userModel.findOne({ email: req.body.email });
      if (emailAlreadyExist) {
        return res.status(400).send('User already exists!');
      }
    } catch (error) { // ERROR 001
      console.log('IRM(001) -> An internal error has occurred while checking if a user already exists when someone was trying to register.', error);
      return res.status(400).send('An internal error has occurred, please try again later (001)');
    }

    try {
      // Encrypting the password before its storation
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.password, salt);

      // Creating db model
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
      });

      // Trying to save the user
      try {
        const savedUser = await user.save();
        res.status(200).send('User saved!');

      } catch(error) { // ERROR 003
        console.log('IRM(003) -> An internal error has occurred while trying to store new user data when someone was trying to register.', error);
      return res.status(400).send('An internal error has occurred, please try again later (003)');
      }
      
    } catch (error) { // ERROR 002
      console.log('IRM(002) -> An internal error has occurred while attempting to encrypt a password when someone was trying to register.', error);
      return res.status(400).send('An internal error has occurred, please try again later (002)');
    }
});
 

// URL -> http://localhost:PORT/api/v1/login
router.post('/login', async (req, res) => {
   // Validating the data
   const validation = loginValidationsSchema.validate(req.body);
   if (validation.error) {
     return res.status(400).send(validation.error.details[0].message);
   }

    // Check if user exists (email/pass method for login)
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send('Invalid email!');
      }

      // Checking if password matches
      try {
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
          return res.status(400).send('Invalid password!');
        }

        // Create and assign a token -> LOGGED IN SUCCESSFULY
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.header(process.env.JWT_HEADER_NAME, token).status(200).send({
          status: "successful",
          message: "Logged in!",
          token: token
        });

      } catch (error) { // ERROR 005
        console.log('IRM(005) -> An internal error has occurred while decrypting password when someone was trying to login.', error);
        return res.status(400).send('An internal error has occurred, please try again later (005)');
      }

    } catch (error) { // ERROR 004
      console.log('IRM(004) -> An internal error has occurred while checking if email exists when someone was trying to login.', error);
      return res.status(400).send('An internal error has occurred, please try again later (004)');
    }


});

module.exports = router;