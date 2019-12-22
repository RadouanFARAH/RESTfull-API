const Order = require('../models/order');
const Product = require('../models/product');
const mongoose =require('mongoose');

exports.order_get_all = (req, res, next)=>{
    Order.find().select('quantity product').populate('product','name').exec().then((result)=>{
        res.statusCode =200;
        res.send(result)
    }).catch((err)=>{
        res.statusCode=500; 
        res.send(err)
    })
};

exports.create_new_order = (req, res, next)=>{
    Product.findById(req.body.productId).then(results => {
        order = new Order({
        _id : mongoose.Types.ObjectId(),
        product : req.body.productId,
        quantity : req.body.quantity
    });
    return order.save()
}).then(result=>{
        res.statusCode=200;
        res.send('created')
    }).catch(err=>{
        res.statusCode= 500;
        res.json({error: err});
    })
};

exports.get_an_order = (req, res, next)=>{
    const id=req.params.orderID;
    Order.findById(id).then((result)=>{
        if(!result){return res.send('not found')}
        res.statusCode=200;
        res.send(result)
    }).catch((err)=>{
        res.statusCode=400;
        res.send(err)
    })
    
};

exports.delete_an_order =  (req,res)=>{
    Order.remove({_id:req.params.orderID}).exec().then(()=>{
        res.statusCode=200;
        res.send('Order Deleted');
    }).catch((err)=>{
        res.statusCode=500;
        res.send(err);
    })
};