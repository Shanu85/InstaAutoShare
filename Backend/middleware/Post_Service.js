const axios=require('axios')
const cheerio = require("cheerio");
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const InstaCookies=require('./InstaCookies.js')
const User=require('../model/userSchema.js')
const PasswordService=require('../middleware/PasswordService.js')

const getMediaIDInsta=async(url)=>{

    let headers={
                'user-agent': 'Instagram 146.0.0.27.125 (iPhone12,1; iOS 13_3; en_US; en-US; scale=2.00; 1656x3584; 190542906)',
                'accept-langauge': 'en-GB,en;q=0.7',
                'origin': 'https://www.instagram.com',
                'referer': 'https://www.instagram.com/',
                'upgrade-insecure-requests': '1',
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'x-requested-with': 'XMLHttpRequest',
        
                'Content-Type': 'application/json'
            }
    
    try
    {
        const response=await axios.get(url,{headers:headers})

        const $ = cheerio.load(response.data)

        const id=$('meta[property="al:ios:url"]').attr('content')
        
        if(typeof id === 'undefined')
        {
            return "404"
        }

        return id.split("=")[1]
    }
    catch(err)
    {
        return err
    }
}

const getURLData=async(url)=>
{
    return await get({
        url: url,
        encoding: null, 
    });
}

const postImage=async(ig,imageURL,caption,taggedUser)=>{

    const image=await getURLData(imageURL) 
    await ig.publish.photo({
        file: image,
        caption: caption, // nice caption (optional)
        usertags: {"in":taggedUser}
    });

}

const postVideo=async(ig,videoURL,coverimageURL,caption,taggedUser)=>{
    const video=await getURLData(videoURL)
    const coverImage=await getURLData(coverimageURL)

    await ig.publish.video({
        // read the file into a Buffer
        video: video,
        coverImage: coverImage,
        caption:caption,
        usertags: {"in":taggedUser}
    });

}

const postAlbum=async(ig,finalData,caption,taggedUser)=>{
    const postData=[]

    for(let i=0;i<finalData.length;i++)
    {
        let obj=finalData[i]
        if(obj.mediaType==1)
        {
            const imageBuffer=await getURLData(obj.imageURL)

            postData.push({file:imageBuffer})
        }
        else if(obj.mediaType==2)
        {
            const imageBuffer=await getURLData(obj.coverImageURL)
            const videoBuffer=await getURLData(obj.videoURL)

            postData.push({video:videoBuffer,coverImage:imageBuffer})
        }
    }

    await ig.publish.album({
        caption:caption,
        items:postData,
        usertags: {"in":taggedUser}
    })
}


const createUserPost=async(selectedUser,type,postData)=>{

    for(let i=0;i<selectedUser.length;i++)
    {
        var ig=new IgApiClient()

        var success=await login(ig,selectedUser[i].username,selectedUser[i].password)

        if(!success)
        {
            console.log(`Login fails for user ${i+1}......`)
            continue
        }

        if(type==1) // image create
        {
            await postImage(ig,postData[0],postData[1],postData[2])
        }
        else if(type==2) // video create
        {
            await postVideo(ig,postData[0],postData[1],postData[2],postData[3])
        }
        else if(type==3)
        {
            await postAlbum(ig,postData[0],postData[1],postData[2])
        }

        console.log(`Post Created for user ${i+1}`)
    }
}

const login=async(ig,IG_USERNAME,IG_PASSWORD)=>{

    const success=await InstaCookies.setCookies(ig,IG_USERNAME,IG_PASSWORD)

    if(!success)
    {
        return false
    }
    return true
}

const getTaggedUser=async(data)=>
{
    // console.log(data)

    const IDData=[]

    for(let i=0;i<data.length;i++)
    {
        IDData.push({"position":[0.24,0.54],"user_id":data[i].user.pk})
    }

    return IDData
}

const postToInstaHelper=async(IG_USERNAME,IG_PASSWORD,mediaID,selectedUser)=>{
    
    const ig = new IgApiClient();

    var success=await login(ig,IG_USERNAME,IG_PASSWORD)

    if(!success)
    {
        return false
    }

    var response=await ig.media.info(mediaID)


    const media_type=response.items['0'].media_type

    // check if some if tagged or not
    var taggedUsers=[]
    if(response.items['0'].usertags)
    {
        taggedUsers=await getTaggedUser(response.items['0'].usertags.in)
    }
    

    if(media_type==1)
    {
        const caption=response.items['0'].caption.text

        const image_url=response.items['0'].image_versions2.candidates['0'].url

        
        await createUserPost(selectedUser,1,[image_url,caption,taggedUsers])
        
    }
    else if(media_type==2)
    {
        const caption=response.items['0'].caption.text
        const clip_url=response.items['0'].video_versions['2'].url
        const videoCover=response.items['0'].image_versions2.candidates['0'].url
        
        await createUserPost(selectedUser,2,[clip_url,videoCover,caption,taggedUsers])
        
    }
    else if(media_type==8)
    {
        const carousel_media=response.items['0'].carousel_media

        const finalData=[]

        for(let i=0;i<carousel_media.length;i++)
        {
            let media=carousel_media[i]

            if(media.media_type==1)
            {
                
                const tempData={'mediaType':1,'imageURL':media.image_versions2.candidates['0'].url}
                finalData.push(tempData)
            }   
            else if(media.media_type==2)
            {
                const tempData={'mediaType':2,'coverImageURL':media.image_versions2.candidates['0'].url,'videoURL':media.video_versions['2'].url}
                finalData.push(tempData)
            }
        }

        const caption=response.items['0'].caption.text

        await createUserPost(selectedUser,3,[finalData,caption,taggedUsers])
    }

    return true
}

const getDetails=async(selectedUser)=>{

    let json=await User.find({})

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
      
    var index=randomNumber(0,selectedUser.length)
      
    var uname=selectedUser[index]

    var data=[]
    var randomPassword;

    for(let i=0;i<json.length;i++)
    {
        let user=json[i]

        let newpassword=PasswordService.decrypt(user.iv,user.password)
        
        if(selectedUser.includes(user.username))
        {
            data.push({'username':user.username,'password':newpassword})
        }
        
        if(user.username===uname)
        {
            randomPassword=newpassword;
        }
    }

    return [uname,randomPassword,data]
}

// return type
// type =1, error
// type=2, success

const postToInsta=async(postURL,selectedUser)=>{
    const mediaID=await getMediaIDInsta(postURL)

    if(mediaID==="404")
    {
        return {'type':1,'message':'post not found ...'}
    }
    

    const detailsArr=await getDetails(selectedUser)

    try
    {
        const success=await postToInstaHelper(detailsArr[0],detailsArr[1],mediaID,detailsArr[2])
        
        if(!success)
        {
            return {'type':1,'message':"cann't create post ...."}
        }

        return {'type':2,'message':'post created successfully ...'}
    }
    catch
    {
        return {'type':1,'message':"cann't create post ...."}
    }
}

// Photo - When media_type=1
// Video - When media_type=2 and product_type=feed
// IGTV - When media_type=2 and product_type=igtv
// Reel - When media_type=2 and product_type=clips
// Album - When media_type=8

module.exports={
    postToInsta,
    getDetails,
    login
}

// post -> https://www.instagram.com/p/CsZa95GvSZj/