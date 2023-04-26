const Order = require('../models/order.model');
const Handphone = require('../../handphone/models/handphone.model');

const createOrder = async (req, res, next) => {
  try {
    const payload = req.body;
    const { handphoneId, quantity } = payload;
    const userId = req.userId;

    const findHandphone = await Handphone.findById(handphoneId).where({isDeleted: false});
    if (!findHandphone) throw {name: 'NOT_FOUND'};
    if (findHandphone.stock < 1 ) throw {name: 'NO_STOCK'};

    const totalPrice = findHandphone.price * quantity;

    const order = await Order.create({
      userId, 
      handphoneId,
      quantity,
      totalPrice
    });

    if(order) await Handphone.updateOne({ _id: handphoneId }, {$inc: {stock: -quantity}}, {new: true});
    
    res.status(201).json({
      message: 'Order was successfully created',
      data: order 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder
};
