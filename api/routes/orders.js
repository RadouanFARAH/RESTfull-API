const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const Orderscontroller = require('../controllers/orders');

router.get('/', checkAuth, Orderscontroller.order_get_all);
router.post('/', checkAuth,Orderscontroller.create_new_order);
router.get('/:orderID', checkAuth, Orderscontroller.get_an_order);
router.delete('/:orderID', checkAuth, Orderscontroller.delete_an_order);
      
module.exports = router;