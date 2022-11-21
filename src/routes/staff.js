const express = require('express');
const router = express.Router();

const staffController = require('../controllers/StaffController');

router.post('/flightdetail', staffController.flightdetail);
router.get('/Regulations', staffController.Regulations);
router.post('/UpdateThamSo', staffController.UpdateThamSo);
router.post('/LoadThamSo', staffController.LoadThamSo);
router.post('/', staffController.index);

module.exports = router;
