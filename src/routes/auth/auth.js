const Joi = require('@hapi/joi');
const router = require('express').Router();
const userModel = require('../../models/User');

// Validations for user register
const registerValidations = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

// URL -> http://localhost:PORT/api/v1/register
router.post('/register', async (req, res) => {
    
    // Validating the data
    const validation = registerValidations.validate(req.body);
    
    if (validation.error) {
      return res.status(400).send({
        status: 'error',
        message: validation.error.details[0].message
      });
    }
    
    // Creating db model
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Trying to save the user
    try {
      const savedUser = await user.save();
      res.status(200).send('User saved!');
    } catch(error) {
      res.status(400).send(error);
    }

  });

// URL -> http://localhost:PORT/api/v1/login
router.get('/login', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;