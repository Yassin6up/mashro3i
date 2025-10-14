const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

const isSeller = (req, res, next) => {
  if (req.user.user_type !== 'seller') {
    return res.status(403).json({ 
      success: false, 
      message: 'Seller access required' 
    });
  }
  next();
};

const isBuyer = (req, res, next) => {
  if (req.user.user_type !== 'buyer') {
    return res.status(403).json({ 
      success: false, 
      message: 'Buyer access required' 
    });
  }
  next();
};

module.exports = { authenticateToken, isSeller, isBuyer };
