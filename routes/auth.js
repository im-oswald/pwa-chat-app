const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');
const User = require('../../models/User');
const config = require('config');

const router = express.Router();

// @route           /api/auth
// @descriotion     to do the authentication
// @access          Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json(user);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route           /api/auth/login
// @descriotion     to do the authentication
// @access          Public
router.post('/login', [
  check('email', 'Not a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(401).json({ errors: [{ msg: 'Invalid email or password' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(isMatch) {
        const payload = {
          user: {
            id: user.id
          }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
          if(err) {
            throw err;
          }

          return res.json({ token });
        })
      } else {
        return res.status(401).json({ errors: [{ msg: 'Invalid email or password' }] });
      }

    } catch(err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
  }
});

module.exports = router;
