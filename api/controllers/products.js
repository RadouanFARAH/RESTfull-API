
const Product = require('../models/product');
const mongoose =require('mongoose');

exports.get_all_products = (req, res, next)=>{
   Product.find().select("name _id price productImage").then((result)=> {
       const response = {
           count : result.length,
           products : result
       }
       res.statusCode=200;
       res.send(response)
   }).catch((err)=>{
       res.statusCode=400;
       res.send(err)
   })
}; 
exports.patch_product = (req,res,next)=>{
    const id = req.params.productID;
    const ops = {};
    for (const op of req.body) {
        ops[op.propName]=op.value
    }
    Product.update({_id:id},{ $set: ops}).then((result)=>{
        res.statusCode =200;
        res.send(result)
    }).catch((err)=>{
        res.status(400).send(err);
    });
};


exports.add_product = (req, res, next)=>{
    console.log(req.file);
    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price, 
        productImage : req.file.path
    });
    product.save().then(result => {
        res.statusCode=200;
        console.log(result);
        res.send(result)
    }).catch((err)=> {
        res.statusCode=400;
        console.log(err);
        res.send(err)
    });
};

exports.get_product = (req, res, next)=>{
    const id=req.params.productID;
    Product.findById(id).exec().then(product =>{
        if(!product){return res.send('not found')}
        res.statusCode=200;
        res.send(product)
    }).catch((err)=>{
        res.statusCode=400;
        res.send('not found')
    })
    
};

exports.delete_product = (req, res)=>{
    const id=req.params.productID;
    Product.remove({_id:id}).then(()=>{
        res.statusCode=200;
        res.send('Product Deleted Successfully')
    }).catch((err)=>{
        res.status(400).send(err);
    })
};