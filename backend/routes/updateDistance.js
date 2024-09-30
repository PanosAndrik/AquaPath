const express = require('express');
const verifyToken = require('../middleware/verifyToken');  
const User = require('../models/User'); 
const router = express.Router();


router.post('/update-distance', verifyToken, async (req, res) => {
  const { newDistance } = req.body;
  const userId = req.user.userId; 

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.total_distance += newDistance;

    // Check if the user has traveled 1 km(which is standard for starters) since the last reminder
    if (user.total_distance >= user.reminder_interval) {
      user.hydration_logs.push({
        distance_traveled: user.total_distance,
        hydrated: false
      });
      user.total_distance = 0;
    }
    
    // Save the user document
    await user.save();
    res.status(200).send('Distance updated and reminder logged');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
