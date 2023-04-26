const express = require('express');
const indexRouter = express.Router();
const authRouter = require('./auth/routes/auth.routes');
const orderRouter = require('./order/routes/oreder.routes');
const handphoneRouter = require('./handphone/routes/handphone.routes')
const authMiddlewares = require('../middlewares/authMiddlewares')

indexRouter.get('/', function(req, res) {
   res.send('Handphone onlineshop API is running!');
});

indexRouter.use('/auth', authRouter)

indexRouter.use(authMiddlewares.authentication);
indexRouter.use('/handphone', handphoneRouter)
indexRouter.use('/order', orderRouter);

module.exports = indexRouter;
