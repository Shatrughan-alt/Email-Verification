require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
// const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use(cors(
    {
        origin:["https://front-part.vercel.app/"],
        methods:["POST","GET"],
        credentials:true
    }
));
const mongoose=require('mongoose');

mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Connection Successful");
}).catch(err=>console.log(err));
app.use(require("./Routes/router"));
// const PORT=process.env.PORT||8080;

app.get("/",async(req,res)=>{
    res.send("Hello");
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Server is working ");
})
