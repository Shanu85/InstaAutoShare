const { IgApiClient } = require('instagram-private-api');
const InstaService=require('./Post_Service')


const getHashtagPost=async(ig,hashtag,hashtagCount)=>{
    const tag = ig.feed.tags(hashtag);

    var data=[]

    while(data.length<hashtagCount)
    {
        var temp=await tag.items()

        // if no post found under hashtag, return the error
        if(temp.length==0)
        {
            return []
        }
        if(temp[0]!==undefined)
        {
            data=data.concat(temp)

        }
    }

    return data
}

const likePost=async(ig,hashtagCount,taggedItems,usrID,username)=>{
    for(let i=0;i<hashtagCount;i++)
    {
        const mediaID=taggedItems[i].pk

        try
        {
            
            const status=await ig.media.like({mediaId:mediaID,moduleInfo:{
                    module_name:'profile',
                    user_id:usrID,
                    username:username
                },d:1})
    
            
        }
        catch(err)
        {
            console.log(err)
        }
    }
}

const likeHashtagPost=async(hashtag,selectedUser,hashtagCount)=>{

    const detailsArr=await InstaService.getDetails(selectedUser)

    const selectedUser_data=detailsArr[2]
    const random_password=detailsArr[1]
    const random_uname=detailsArr[0]
    

    const ig = new IgApiClient();

    var success=await InstaService.login(ig,random_uname,random_password)

    if(!success)
    {
        return false
    }

    
    const taggedItems=await getHashtagPost(ig,hashtag,hashtagCount)

    if(taggedItems.length==0)
    {
        return {'type':1,'message':'no post found for the given hashtag ...'}
    }


    for(let i=0;i<selectedUser_data.length;i++)
    {
        console.log(selectedUser_data[i].username)
        
        const igClient=new IgApiClient()

        var success=await InstaService.login(igClient,selectedUser_data[i].username,selectedUser_data[i].password)

        if(success)
        {
            let usrID=await igClient.user.getIdByUsername(selectedUser_data[i].username)
            await likePost(igClient,hashtagCount,taggedItems,usrID,selectedUser_data[i].username)
        }
    }
    
    return {'type':2,'message':'success ...'}
}

module.exports={
    likeHashtagPost
}