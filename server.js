const express=require('express');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/auth');
app.use('/api/auth', authRoutes);

const questionRoutes=require('./routes/questions');
app.use('/api/questions', questionRoutes);

app.get('/', function(req, res){
    res.json({message: 'Server is running!'});
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});