const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const User = require('../modules/user/models/user.model');

const authentication = (req, res, next) => { 
  try {
    const access_token = req.headers.access_token; 
    if (!access_token) { 
      throw {name: "MISSING_TOKEN"};
    }
    
    const key = process.env.JWT_KEY;
  
    jwt.verify(access_token, key, (err, decoded) => {
      if (err) throw {name: "INVALID_TOKEN"};
      
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    });
  } catch (err) {
    next(err);
  }
}

const adminAuthorization = async (req, res, next) => {
  const userId = req.userId;
  const searchUser = await User.findById(userId);

  try {
    if (searchUser.role.toString() !== 'admin') {
      throw {name: "FORBIDDEN"};
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}


module.exports = {
  authentication,
  adminAuthorization
};