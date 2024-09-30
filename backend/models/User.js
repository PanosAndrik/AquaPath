const mongoose = require('mongoose');

const HydrationLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  distance_traveled: { type: Number, required: true }, // the kms that the user traveled
  hydrated: { type: Boolean, default: false } // Did the user drink water when reminded
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  total_distance: { type: Number, default: 0 },
  reminder_interval: { type: Number, default: 1 },
  hydration_logs: [HydrationLogSchema] 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
