const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const User = require('../../user/models/user.model')

const signup = async (req, res, next) => {
  const { email, password, username, role } = req.body;
  try {
    //generate salt
    const salt = await bcrypt.genSalt();
    //genarete hash password
    const hash = await bcrypt.hash(password, salt);

    const register = await User.create({
      username,
      email,
      password: hash,
      role
    });

    const data = {
      email,
      userRole: register.role
    }
    
    res.status(201).json({
      message: 'User was registered successfully',
      data
    });
    
  } catch (err) {
    next(err);
  }
}

const signin =  async (req, res, next) => {
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw {name: 'FALSE_LOGIN'};

    const isMatch = bcrypt.compareSync(
      password,
      user.password
    );

    if (!isMatch) throw {name: 'FALSE_LOGIN'};
    
    const key = process.env.JWT_KEY;
    const expiresIn = process.env.JWT_EXPIRE_IN;
    const token = jwt.sign({userId: user.id, role: user.role}, key, {
       expiresIn,
    });

    res.status(200).json({
      message: 'Login successful!',
      data: {
        accessToken: token,
      }
    });
    
   } catch (err) {
     next(err);
  }
}

module.exports = {
  signup,
  signin
};