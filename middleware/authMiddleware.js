const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');  // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
