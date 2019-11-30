const router = require('express').Router();
const userModel = require('../../models/User');
const Joi = require('@hapi/joi');
const { registerValidationsSchema, loginValidationsSchema } = require('../../validations/auth');
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
router.get('/login', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;