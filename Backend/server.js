const express = require('express');
const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const mongoose = require("mongoose");
const userRoute=require('./routes/userRoutes')
const instaRoute=require('./routes/instaRoutes')
require('dotenv').config()


const serverApp=express()
serverApp.use(express.json()) // help in using express data
serverApp.use(express.urlencoded({extended:false}))
serverApp.use(bodyparser.json())
serverApp.use(cookieParser());
mongoose.set("strictQuery", false);

serverApp.use(cors({
    origin:['http://localhost:3000','https://insta-auto-share.vercel.app'],
    credentials:true
}));



serverApp.use('/api/user',userRoute);
serverApp.use('/api/insta',instaRoute)

const PORT=process.env.PORT || 5001 ;

// connect to mongoDB and start the server

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        serverApp.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err)=>{console.log(err)})
