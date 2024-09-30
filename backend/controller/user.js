const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//registerUser function
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
      // Check if the user is already registered or already exists!
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).send('User already exists');
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save the new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        total_distance: 0,  // Start with 0 km traveled
        reminder_interval: 1  // Default to 1 km reminders
      });
  
      await newUser.save();
      res.status(201).send('User created successfully');
    } catch (err) {
      res.status(500).send('Error creating user');
    }
  }

  //login function 
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // here we search for the user using the email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
  
      // Compare the password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' 
      });
  
      
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }

 module.exports ={registerUser, login};