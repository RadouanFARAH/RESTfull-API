const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')
const multer = require('multer');
const Productscontroller = require('../controllers/products');
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname);
    }
});
const fileFilter = (req, file, cb)=> {
    if(file.mimetype==='image/jpeg'){cb(null, true)}
    else{cb(null, false)}
}

const upload = multer({storage : storage, fileFilter : fileFilter, limits : { fileSize :1024*1024*5}});


router.get('/',Productscontroller.get_all_products);
router.patch('/:productID', checkAuth, Productscontroller.patch_product);
router.post('/', checkAuth, upload.single('productImage'),Productscontroller.add_product);
router.get('/:productID',Productscontroller.get_product);
router.delete('/:productID', checkAuth, Productscontroller.delete_product);

module.exports = router;