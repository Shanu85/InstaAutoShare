const express=require("express")
const router=express.Router()
const {createPost,likeHashtag,followAccount}=require('../controller/instaController')


router.post('/createpost',createPost)
router.post('/likeHashtag',likeHashtag)
router.post('/followAccount',followAccount)

module.exports=router