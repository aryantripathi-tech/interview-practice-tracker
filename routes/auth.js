const express=require('express');
const router=express.Router();
 
// POST /api/auth/signup
router.post('/signup', function(req, res){
    let name =req.body.name;
    let email=req.body.email;
    let password=req.body.password;

    // For now - just confirm we received the data
    console.log('Singup attempt:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    res.json({
        message: 'Signup data received!',
        user:{
            name: name,
            email: email
        }
    });
});

//POST /api/auth/login
router.post('/login', function(req, res){
    let email=req.body.email;
    let password=req.body.password;

    console.log('Login attempt:');
    console.log('Email:', email);
    console.log('Password:', password);

    // For now - just confirm we received it
    res.json({
        message: 'Login data received!',
        receivedEmail: email
    });
});

module.exports=router;