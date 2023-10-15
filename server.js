const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

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

app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
