const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const prev_user = await User.findOne({ where: { username } });
    if( prev_user) res.status(409).json({error: "Username Already Exists"});
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user_data: {id: user.id, username: user.username, createdAt: user.createdAt} });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ message: 'Login successful', token, user: { user_id: user.id, user_name: user.username, created_at: user.createdAt} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProtected = (req, res) => {
  res.status(200).json({ userId: req.user.id });
};

module.exports = { register, login, getProtected };
