const express =require ('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('./connection')
const auth=require('./routes/Auth')
const Todo=require('./routes/Todo')
require('dotenv').config()
const path = require("path");


const app=express()


app.use(express.json());


app.use(cors())
app.use(express.json())


const PORT =1000;
app.use('/api/v1',auth)
app.use('/api/v2',Todo)

app.get("/", (req, res) => {
     app.use(express.static(path.resolve(__dirname, "frontend", "build")));
     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
    });

app.listen(PORT,()=>{
    console.log(`listening on : ${PORT}`);
});