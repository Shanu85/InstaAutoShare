const express=require("express")
const router=express.Router()

const {registerUser,getUsers,removeUser}=require('../controller/userController')

router.get('/getusers',getUsers)
router.post('/adduser',registerUser)
router.post('/removeuser',removeUser)

module.exports=router