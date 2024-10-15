const express = require('express');
const verifyToken = require('../middleware/verifyToken');  
const User = require('../models/User'); 
const router = express.Router();

router.post('/update-distance', verifyToken, async (req, res) => {
  const { newDistance } = req.body;
  const userId = req.user.userId; 

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.total_distance += newDistance;

    // Check if the user has traveled 1 km(which is standard for starters) since the last reminder
    if (user.total_distance >= user.reminder_interval) {
      user.hydration_logs.push({
        date: new Date(),
        distance_traveled: user.total_distance,
        hydrated: false
      });
      
      // Reset the total_distance after logging
      const traveledDistance = user.total_distance;
      user.total_distance = 0;
      
      // Save the user document
      await user.save();

      // Send a notification to the user
      res.status(200).json({
        message: 'Distance updated and reminder logged',
        shouldNotify: true,
        notificationMessage: `You've traveled ${traveledDistance.toFixed(2)}km. Time to drink some water!`
      });
    } else {
      // Save the user document
      await user.save();

      res.status(200).json({
        message: 'Distance updated',
        shouldNotify: false
      });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;