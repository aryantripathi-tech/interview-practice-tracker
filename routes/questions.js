const express=require('express');
const router=express.Router();
const Question=require('../models/Question');
const protect=require('../middleware/auth');

// POST /api/questions - protected route
router.post('/', protect, async function(req,res){
    try {
        let newQuestion=new Question({
            title: req.body.title,
            company: req.body.company,
            topic: req.body.topic,
            difficulty: req.body.difficulty,
            notes: req.body.notes,
            userID: req.user.userID
        });

        await newQuestion.save();

        res.json({
            message: 'Question saves successfully!',
            question: newQuestion
        });

    }catch(error){
        console.log('Save question error:', error);
        res.json({message: 'Something went wrong. Please try again.'});
    }
});

// GET /api/questions - protected route
router.get('/', protect,  async function(req,res){
    try {
        let questions= await Question.find({userID: req.user.userID});

        res.json({
            message: 'Question fetched successfully!',
            questions: questions
        });

    }catch(error){
        console.log('Fetch questions error:', error);
        res.json({message: 'Something went wrong. Please try again.'});
    }
});

module.exports=router;