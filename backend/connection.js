const mongoose=require('mongoose')

const conn=async(req,res)=>{
   try {
    await mongoose.connect('mongodb+srv://mohammedshabeeb0000:Mala1234@cluster0.ihz2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>[
        console.log('connected mongo')
       ])
   } catch (error) {
    res.status(400).json({message:'not connected'});
   }
};
conn();