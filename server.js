const express = require('express');
const cors = require('cors');
const http = require('http');
const config = require('config');
const socketIo = require('socket.io');
const connectDB = require('./config/db');

const clientBaseURL = config.get('clientBaseURL');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: clientBaseURL });

module.exports.io = io;

// Use the CORS middleware with default options (allows all origins)
app.use(cors());

connectDB();

// To receive json payload from forms
app.use(express.json({ extended: false }));

// API heartbeat url
app.get('/', (_req, res) => res.send('API is running'));

// Define the custom routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started running at ${PORT}`));
