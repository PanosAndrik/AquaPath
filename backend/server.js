const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/user');
const updateDistanceRoute = require('./routes/updateDistance');
const hydrationRoutes = require('./routes/hydration');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // To parse JSON requests

// Connect to my database in Atlas-MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('AquaPath server is running');
});

// Use the routes
app.use('/api', updateDistanceRoute);
app.use('/api', userRouter); 
app.use('/api', hydrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
