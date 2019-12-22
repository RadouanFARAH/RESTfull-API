const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/', (req, res,next)=>{
    User.find().exec().then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
});


router.post('/login', (req,res,next)=>{

    User.find({email : req.body.email}).exec().then((user)=>{
        if (user.length < 1) { return res.send('Auth failed1')} bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if (err) { return res.send('Auth failed2')}
            if (result) { 
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId : user[0]._id
                    }, process.env.JWT_KEY, 
                    {
                        expiresIn : '1h'
                    }
                );
                return res.json({message : 'Auth Successful', token : token})
            } res.send('Auth failed3');
        })
    })
});

router.post('/signup',(req,res,next)=>{
    User.find({email : req.body.email}).exec().then(user => {if (user.length>=1) {return res.send('User already exists')} else {bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if (err) {return res.status(400).json({errors:err})} else { const user = new User({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            password : hash
        }); user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({message: 'user created'});
        })
        .catch(err => {
            console.log(err);
            res.status(501).json({errors:err});
        }) 
        }
    })}})

});


router.delete('/:userId',(req, res, next)=>{
    User.remove({_id: req.params.userId}).exec().then(result=> {res.send('User Deleted Successfully')}).catch(err=> {
        res.send(err);
    })
})


module.exports = router;