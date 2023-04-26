const Handphone = require('../models/handphone.model');

const createHandphone = async (req, res, next) => {
  try {
    const payload = req.body;
    const { name, brand, stock, price, description } = payload;
    const handphone = await Handphone.create(payload);
  
    res.status(201).json({
      message: 'Handphone was successfully added',
      data: handphone 
    });
  } catch (error) {
    next(error);
  }
};

const getAllHandphone = async (req, res, next) => {
  try {
    const handphone = await Handphone.find().where({isDeleted: false});
    if (handphone.length < 1) {
      throw {name: "NOT_FOUND"};
    } 

    res.status(200).json({
      message: 'All Handphone successfully retrieved.',
      data: handphone 
    });
  } catch (error) {
    next(error);
  }
};

const getHandphoneById = async (req, res, next) => {
  const payload = req.params.handphoneId;
  try {
    const handphone = await Handphone.findById(payload).where({isDeleted: false});

    if (!handphone) throw {name: 'NOT_FOUND'};
    
    res.status(200).json({
      message: 'Handphone details successfully retrieved.',
      data: handphone
    });
  } catch (error) {
    next(error);
  }
};

const updateHandphone = async (req, res, next) => {
  const { handphoneId } = req.params;
  const payloadBody = req.body;
  const { name, brand, stock, price, description } = payloadBody;

  for (const key in payloadBody) {
    if (!payloadBody[key]) {
      delete payloadBody[key];
    }
  }

  try {
    const existingHandphone = await Handphone.findOne({ _id: handphoneId, isDeleted: false });
    if (!existingHandphone) throw {name: 'NOT_FOUND'};

    await Handphone.updateOne({ _id: handphoneId }, payloadBody);

    res.status(200).json({
      message: 'Handphone was successfully updated',
    });    
  } catch (error) {
    next(error);
  }
};

const deleteHandphone = async (req, res, next) => {
  const { handphoneId } = req.params;
 
  try {
    const existingHandphone = await Handphone.findOne({ _id: handphoneId, isDeleted: false });
    if (!existingHandphone) throw {name: 'NOT_FOUND'};
    

    await Handphone.updateOne({ _id: handphoneId }, { isDeleted: true});

    res.status(200).json({
      message: 'Handphone was successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHandphone,
  getAllHandphone,
  getHandphoneById,
  updateHandphone,
  deleteHandphone,
};
