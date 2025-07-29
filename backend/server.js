require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Load environment variables
require('dotenv').config();

// Middleware (optional example)
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a sample route
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
