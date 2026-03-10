const express=require('express');
const router=express.Router();
const User=require('../models/User');

// POST /api/auth/signup
router.post('/signup', async function(req, res){
    try {
        let name =req.body.name;
        let email=req.body.email;
        let password=req.body.password;

        // Check if user already exists
        let existingUser= await User.findOne({email:email});
        if(existingUser){
            return res.json({message: 'Account with this email already exists'});
        }

        // Create new user
        let newUser= new User({
            name: name,
            email: email,
            password: password
        });

        // Save to database
        await newUser.save();

        res.json({
            message: 'Account created successfully!',
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch(error){
        console.log('Signup error:', error);
        res.json({message: 'Something went wrong. Please try again.'});
    }
});

//POST /api/auth/login
router.post('/login', async function(req, res){
    try {
        let email=req.body.email;
        let password=req.body.password;

        // Find user by email
        let user= await User.findOne({email: email});
        if(!user){
            return res.json({message: 'Wrong email or password'});
        }

        // Check password - plain text for now
        if(password!==user.password){
            return res.json({message: 'Wrong email or password'});
        }

        res.json({
            message: 'Login successful!',
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }catch(error){
        console.log('Login error:', error);
        res.json({message: 'Something went wrong. Please try again.'});
    }
});

module.exports=router;