const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(function(){
        console.log('Connected to MongoDB successfully!');
    })
    .catch(function(error){
        console.log('MongoDB connection faiiled:', error);
    });

// Routes
const authRoutes=require('./routes/auth');
app.use('/api/auth', authRoutes);

const questionRoutes=require('./routes/questions');
app.use('/api/questions', questionRoutes);

// Health check
app.get('/', function(req, res){
    res.json({message: 'Server is running!'});
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function(){
    console.log(`Server running on port ${PORT}`);
});