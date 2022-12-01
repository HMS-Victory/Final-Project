const mongoose=require('mongoose');

let taskSchema=new mongoose.Schema({
    task:{
        type: String
    },
     description:{
        type: String
    }
})

mongoose.model('Task', taskSchema);