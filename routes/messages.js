const express = require('express');
const { ObjectId } = require('mongodb');
const { check, validationResult } = require('express-validator');
const Message = require('../models/Message');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { io } = require('../server');

const router = express.Router();

// @route           /api/messages
// @description     to create a new message
// @access          Private
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
    const isChatExists = await Message.findOne({
      $or: [{ receiver: to, sender: from }, { receiver: from, sender: to }]
    });
    const messageObj = new Message({ receiver: to, sender: from, content: message });

    await messageObj.save();

    console.log('Chat Exists: ', !!isChatExists);

    if (!isChatExists) {
      const sender = { _id: req.user.id, name: req.user.name };
      const receiver = await User.findOne({ _id: to }, '_id name');
      // Start of a new chat
      io.emit('newChat', { sender, receiver, lastMessage: messageObj, unreadCount: 0 });
    }

    io.emit('newMessage', messageObj);

    return res.json({ message: messageObj });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route           /api/messages
// @description     to get all the messages
// @access          Private
router.get('/', auth, async (req, res) => {
  const to = req.query.to;
  const from = req.query.from;

  if (!to || !from) {
    return res.status(400).json({ errors: [{ msg: 'Receiver and Sender must be provided in the query parameters' }] });
  }

  try {
    const messages = await Message.find(
      {$or: [{ receiver: to, sender: from }, { receiver: from, sender: to }] }
    ).sort({ createdAt: 1 });

    return res.json({ messages });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route           /api/messages/chat-list
// @description     to get all the chat heads of a user with last message
// @access          Private
router.get('/chat-list', auth, async (req, res) => {

  const userId = new ObjectId(req.user.id)

  try {
    const result = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$sender', userId] },
              then: '$receiver',
              else: '$sender',
            },
          },
          lastMessage: {
            $max: {
              $cond: {
                if: { $eq: ['$sender', userId] },
                then: '$$ROOT',
                else: '$$ROOT',
              },
            },
          },
          unreadCount: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ['$receiver', userId] },
                    { $eq: ['$readAt', null] }
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users', // The name of the User model's collection
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          user: {
            _id: 1,
            name: 1, // Include the user's name
          },
          lastMessage: 1,
          unreadCount: 1,
        },
      },
      {
        $sort: { 'lastMessage.date': -1 }, // Sort by the date of the last message
      },
    ]).exec();
    
    return res.json({ chats: result });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route           /api/messages/chat-list
// @description     to get all the chat heads of a user with last message
// @access          Private
router.put('/read-messages', auth, async (req, res) => {
  const userId = new ObjectId(req.user.id);
  const chatUserId = new ObjectId(req.query.from);

  try {
    await Message.updateMany(
      { receiver: userId, sender: chatUserId },
      { $set: { readAt: new Date() } },
    );

    user = await User.findById(chatUserId, '_id name');

    io.emit('chatRead', { user, unreadCount: 0 });

    return res.json({ msg: 'Message read for the given user successfully' });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
