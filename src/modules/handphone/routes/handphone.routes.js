const express = require('express');
const router = express.Router();
const handphoneController = require('../controllers/handphone.controller');
const authMiddlewares = require('../../../middlewares/authMiddlewares')

router.post('/', authMiddlewares.adminAuthorization, handphoneController.createHandphone);

router.get('/', handphoneController.getAllHandphone);

router.get('/:handphoneId', handphoneController.getHandphoneById);

router.put('/:handphoneId', authMiddlewares.adminAuthorization, handphoneController.updateHandphone);

router.delete('/:handphoneId', authMiddlewares.adminAuthorization, handphoneController.deleteHandphone);

module.exports = router;
