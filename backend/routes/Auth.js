const router=require('express').Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs')

//signup

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const user = new User({ email, username, password: hashPassword });
        await user.save().then(()=>res.status(200).json({message:'Signup Successful'}))

        // Respond with success
        
    } catch (error) {
        res.status(200).json({message:'user already exists'})
       
    }
});

//login

router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({
            email:req.body.email
        });
        if (!user){
            res.status(400).json({message:'please Signup First'})
        }
        const ispasswordcorrect=bcrypt.compareSync(req.body.password,user.password);

        
        if (!ispasswordcorrect){
            res.status(400).json({message:'password is incorrect'})
        }

        const { password, ...others } = user._doc;
        res.status(200).json({      
            message: "Login successful",
            user: others
          });
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'login failed'})
    }
})

module.exports=router;