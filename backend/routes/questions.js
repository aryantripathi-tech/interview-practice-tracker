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

// GET /api/questions/stats - get analytics for logged in user
router.get('/stats', protect, async function(req, res){
    try {
        let userID = req.user.userID;
        
        //Fetch all questions for this user
        let questions = await Question.find({userID: userID});

        // Total count
        let total = questions.length;

        // Breakdown by difficulty
        let easy = questions.filter(q=>q.difficulty==='Easy').length;
        let medium = questions.filter(q=>q.difficulty==='Medium').length;
        let hard = questions.filter(q=>q.difficulty==='Hard').length;

        // Top companies
        let companyCounts={};
        for(let question of questions){
            let company=question.company || 'Unknown';
            if(companyCounts[company]){
                companyCounts[company]++;
            }
            else{
                companyCounts[company]=1;
            }
        }

        // Top topics
        let topicCounts={};
        for(let question of questions){
            let topic=question.topic || 'Unknown';
            if(topicCounts[topic]){
                topicCounts[topic]++;
            }
            else{
                topicCounts[topic]=1
            }
        }

        // Recent 5 questions
        let recent=questions
            .sort(function(a, b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .slice(0, 5)
            .map(function(q){
                return {
                    title: q.title,
                    company: q.company,
                    difficulty: q.difficulty,
                    createdAt: q.createdAt
                };
            });

        res.json({
            message: 'Stats fetched successfully!',
            stats: {
                total: total,
                difficulty: {easy, medium, hard},
                companyCounts: companyCounts,
                topicCounts: topicCounts,
                recent: recent
            }
        });

    } catch(error){
        console.log('Stats error:', error);
        res.json({message: 'Something went wrong.'});
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