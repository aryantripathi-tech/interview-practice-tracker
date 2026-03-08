const express=require('express');
const router=express.Router();

// POST /api/questions
router.post('/', function(req,res){
    let title=req.body.title;
    let company=req.body.company;
    let topic=req.body.topic;
    let difficulty=req.body.difficulty;
    let notes=req.body.notes;

    console.log('New question received:');
    console.log(req.body);

    // For now - just confirm receipt
    res.json({
        message: 'Question received!',
        question: {
            title: title,
            company: company,
            topic: topic,
            difficulty: difficulty
        }
    });
});

module.exports=router;