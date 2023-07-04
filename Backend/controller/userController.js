const User=require('../model/userSchema')
const asyncHandler=require('express-async-handler')
const { IgApiClient } = require('instagram-private-api');
const InstaCookie=require('../middleware/InstaCookies')
const PasswordService=require('../middleware/PasswordService')

const registerUser=asyncHandler(async(req,res)=>{
    const {username,password}=req.body;

    // check if user exists

    const existingUser = await User.findOne({username})

    if(existingUser)
    {
        return res.status(200).json({'type':1,'message':'user already exists!!'})
    }

    let {iv,encryptedData}=PasswordService.encrypt(password)

    // create new user
    const newuser=await User.create({'username':username,iv,'password':encryptedData})

    if(newuser)
    {
        const ig = new IgApiClient();
        ig.state.generateDevice(username);

        var loginSuccessfull=await InstaCookie.handleLogin(ig,username,password)

        if(!loginSuccessfull)
        {
            return res.status(200).json({'type':1,'message':'user not exists in instagram !!!'})
        }
        

        return res.status(200).json({'type':2,'message':'user added'}) 
    }
    else
    {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


const getUsers=asyncHandler(async(req,res)=>{

    let data=[]

    const collection=await User.find({})

    collection.map((item)=>{
        data.push({'username':item.username})
    })

    res.status(200).json(data)
})

const removeUser=asyncHandler(async(req,res)=>{
    const username=req.body.username

    await User.deleteOne({username})
    .then(()=>{
        console.log('entry deleted ...')
    })
    .catch((err)=>{
        console.log(err)
    })

    await InstaCookie.deleteEntry(username)

    res.status(200).json({'message':'user removed'})  
})

module.exports={registerUser,getUsers,removeUser}