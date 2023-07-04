const mongoose=require('mongoose')

const cookieSchema=mongoose.Schema({
    username:
    {
        type:String,
        required:true
    },
    userdata:
    {
        type:String,
        required:true
    }
})

const UserCookie=mongoose.model("UserCookie",cookieSchema)
module.exports=UserCookie                                         