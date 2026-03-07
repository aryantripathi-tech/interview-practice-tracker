const express=require('express');
const app=express();

// Middleware - runs on every request
app.use(express.json());

// Routes
const authRoutes=require('./routes/auth');
app.use('/api/auth', authRoutes);

// Health check
app.get('/', function(req, res){
    res.json({message: 'Server is running!'});
});

// Start server
app.listen(3000, function(){
    console.log('Server running on port 3000');
});