const express=require('express');
const mongoose=require('mongoose');
const Task=mongoose.model('Task');
const router=express.Router();

// I need to get this to work so that you can edit things in mongodb from the browser.
// This is the ONLY thing I have left before this project is finished, If I finish this the project is finished.

router.get("/", (req,res)=>{
    res.render("addOrEdit", {
        viewTitle: "Task" 
    })
})

router.post('/', (req,res)=>{
    if(req.body._id==""){
        insertRecord(req, res);
    }else{
        updateRecord(req,res);
    }
});


function insertRecord(req, res){
    let task=new Task();

    task.task=req.body.task;

    task.description=req.body.description;

    task.save((err,doc)=>{
        if(!err){
            res.redirect('list');
        }else{
            if(err.name=="ValidationError"){
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: "Insert Task",
                    task:req.body
                })
            }
            console.log("Error occured during record insertion"+err);
        }
    })
}


function updateRecord(req,res){
    Task.findOneAndUpdate({_id:req.body._id,}, req.body, {new:true}, (err, doc)=>{
        if(!err){
            res.redirect('list');
        }else{
            if(err.name=="ValidationError"){
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: 'Update Task',
                    task: req.body
                });
            }else{
                console.log("Error occured in Updating the records"+err)
            }
        }
    })
}


router.get('/list', (req, res)=>{
    Task.find((err, docs)=>{
        if(!err){
            res.render("list", {
                list:docs
            });
        }else{
            console.log('an error occured when rendering the /list: '+err);
        }
    });
});
 
router.get('/:id', (req,res)=>{
    Task.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("addOrEdit",{
                viewTitle: "Update Task",
                task:doc
            })
        }
    })
})



router.get('/delete/:id', (req, res)=>{
    Task.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            res.redirect('/list');
        }else{
            console.log('An error occures during the delete process'+err)
        }
    });
});
// router.route("/remove/:id").get((req, res) => {
//     const id = req.params.id;
//     TodoTask.findByIdAndRemove(id, (err) => {
//       if (err) return res.send(500, err);
//       res.redirect("/");
//     });
//   });


module.exports=router;