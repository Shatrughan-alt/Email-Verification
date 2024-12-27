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
require("./db");
app.use(require("./Routes/router"));
// const PORT=process.env.PORT||8080;
app.listen(5000,()=>{
    console.log("Server is working ");
})
