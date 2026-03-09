const mongoose=require('mongoose');

const questionSchema= new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    company:{
        type: String,
        default: ''
    },
    topic:{
        type: String,
        default: ''
    },
    difficulty:{
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    notes:{
        type: String,
        default: ''
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports=mongoose.model('Question', questionSchema);