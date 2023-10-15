const express = require('express');
const { check, validationResult } = require('express-validator');
const Message = require('../models/Message');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route           /api/messages
// @description     to create a new message
// @access          Public
router.post('/', auth, [
  check('to', 'Receiver must be there').not().isEmpty(),
  check('from', 'Sender must be there').not().isEmpty(),
  check('message', 'Message should not be empty').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { to, from, message } = req.body;

  try {
    const messageObj = new Message({ receiver: to, sender: from, content: message });

    await messageObj.save();

    return res.json({ data: messageObj });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
