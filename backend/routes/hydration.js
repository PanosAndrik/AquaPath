const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

router.post('/update-hydration', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { date, isHydrated } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the log for the given date or create a new one
    let log = user.hydration_logs.find(log => log.date.toDateString() === new Date(date).toDateString());
    
    if (log) {
      log.hydrated = isHydrated;
    } else {
      user.hydration_logs.push({
        date: new Date(date),
        distance_traveled: 0,
        hydrated: isHydrated
      });
    }

    await user.save();
    res.status(200).json({ message: 'Hydration status updated' });
  } catch (err) {
    console.error('Error updating hydration status:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/hydration-status', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { startDate, endDate } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const logs = user.hydration_logs.filter(log => 
      log.date >= new Date(startDate) && log.date <= new Date(endDate)
    );

    res.status(200).json(logs);
  } catch (err) {
    console.error('Error fetching hydration status:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;