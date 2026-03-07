// Step 1: Import Express
const express=require('express');

// Step 2: Create the app
const app=express();

// Step 3: Tell Express to understand JSON
app.use(express.json());

// Step 4: Create your first route
app.get('/', function(req, res){
    res.send('Server is running!');
});

// Route 2: A route that sends back JSON data
app.get('/test', function(req, res){
    res.json({
        message:"BAckend is working!",
        phase:"Phase 3",
        status:"Learning"
    });
});

// Route 3: A route that receives data
app.post('/login', function(req, res){
    let email=req.body.email;
    let password=req.body.password;

    console.log("Login attempt:");
    console.log("Email:", email);
    console.log("Password:", password);

    res.json({
        message: "Data received!",
        receivedEmail: email
    });
});

// Step 5: Start listening for requests
app.listen(3000, function(){
    console.log('Server started on port 3000');
});