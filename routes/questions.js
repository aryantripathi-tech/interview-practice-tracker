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
            message: 'Question saved successfully!',
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

// DELETE /api/questions/:id
router.delete('/:id', protect, async function(req, res){
    try {
        let questionID = req.params.id;

        // Find the question first
        let question = await Question.findById(questionID);

        // Does it exist?
        if(!question){
            return res.json({message: 'Question not found'});
        }

        // Does it belong to the logged in user?
        if(question.userID.toString() !== req.user.userID){
            return res.json({message: 'Not authorized to delete this question'});
        }

        // Delete it
        await Question.findByIdAndDelete(questionID);

        res.json({message: 'Question deleted successfully!'});
    } catch(error){
        console.log('Delete error:', error);
        res.json({message: 'Something went wrong.'});
    }
});
module.exports=router;