const asyncHandler=require('express-async-handler')
const InstaService=require('../middleware/Post_Service')
const InstaHashtagService=require('../middleware/Hashtag_Service')
const InstaFriendship=require('../middleware/FriendshipService')

const createPost=asyncHandler(async(req,res)=>{
    const {postURL,selectedUser,iconname}=req.body

    if(iconname==='instagram')
    {
        var message=await InstaService.postToInsta(postURL,selectedUser)

        return res.status(200).json(message)
    }
    
    else if(iconname==='tiktok')
    {
        console.log('Tiktok functionality to be implemented ....')
    }
    else
    {
        return res.status(400).json({'message':'not found ....'})
    }

    res.status(200).json({'type':2,'message':'post created successfully'})
})

const likeHashtag=asyncHandler(async(req,res)=>{
    const {hashtag,selectedUser,iconname,hashtagCount}=req.body

    if(iconname==='instagram') 
    {
        var message=await InstaHashtagService.likeHashtagPost(hashtag,selectedUser,hashtagCount)

        return res.status(200).json(message)
    }
    
    else if(iconname==='tiktok')
    {
        console.log('Tiktok functionality to be implemented ....')
    }
    else
    {
        return res.status(400).json({'message':'no post found under given hashtag ....'})
    }
})

const followAccount=asyncHandler(async(req,res)=>{
    const {accountName,selectedUser,iconname}=req.body

    if(iconname==='instagram')
    {
        var message=await InstaFriendship.sendFollowRequest(accountName,selectedUser)

        console.log(message)

        return res.status(200).json(message)
    }
    else if(iconname==='tiktok')
    {
        console.log('Tiktok functionality to be implemented ....')
    }
    else
    {
        return res.status(400).json({'message':'no post found under given hashtag ....'})
    }
})

module.exports={createPost,likeHashtag,followAccount}