const router=require('express').Router();
const User=require('../models/User');
const Todo=require('../models/Todo');

router.post('/addTask',async(req,res)=>{
    try {
        const {title,body,id}=req.body;
    const existingUser=await User.findById(id);
    if(existingUser){
        const todo=new Todo({title,body,user:existingUser});
        await todo.save().then(()=>{
          res.status(200).json({todo})
        });
        existingUser.todo.push(todo);
        existingUser.save();
    }
    } catch (error) {
        console.log(error)
    }
   
});

//update

router.put('/updateTask/:id',async(req,res)=>{
    try {
        const {title,body}=req.body;
    
        const todo=await Todo.findByIdAndUpdate(req.params.id,{title,body})
        todo.save().then(()=>
            res.status(200).json({message:'task updated',todo})
        )
    
    } catch (error) {
        console.log(error)
    }
   
});

//delete

router.delete('/deleteTask/:id',async(req,res)=>{
    try {
        const {title,body,id}=req.body;
    const existingUser=await User.findByIdAndUpdate(id,{$pull:{todo:req.params.id}});
    if(existingUser){
        const todo=await Todo.findByIdAndDelete(req.params.id,{title,body}).then(()=>
            res.status(200).json({message:'task deleted'})
        )
        
    }
    } catch (error) {
        console.log(error)
    }
   
});

//get task

router.get('/getTask/:id',async(req,res)=>{
    const todo=await Todo.find({user:req.params.id}).sort({createdAt:-1});
    if (todo.length !==0){
    res.status(200).json({todo})
    }
    else{
        res.status(200).json({message:'no data found'})
    }
})



module.exports =router
