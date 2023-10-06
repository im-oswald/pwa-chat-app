const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// To receive json payload from forms
app.use(express.json({ extended: false }));

// API heartbeat url
app.get('/', (_req, res) => res.send('API is running'));

// Define the custom routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
