const express = require('express');
const app = express();
const morgan = require('morgan');
const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RESTfullAPI', {useNewUrlParser: true, useUnifiedTopology: true});
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (res.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use((req, res) => {
    res.statusCode=400;
    res.end('Not Found')
})

module.exports = app;