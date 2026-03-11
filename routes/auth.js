const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
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

        // Hash the password - 10 is the salt rounds
        let hashedPassword= await bcrypt.hash(password, 10);

        // Save user with hashed password
        let newUser= new User({
            name: name,
            email: email,
            password: hashedPassword
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

        // Compare password with hash
        let passwordMatch= await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.json({message: 'Wrong email or password'});
        }

        let token= jwt.sign(
            {userID: user._id, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.json({
            message: 'Login successful!',
            token: token,
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