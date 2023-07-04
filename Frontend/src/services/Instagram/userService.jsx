import axios from "axios";

export const BACKEND_URL='https://insta-auto-share-api.onrender.com'

export const getUser=async()=>{
    try
    {
        
        const response=await axios.get(`${BACKEND_URL}/api/user/getusers`);

        return response.data
    }
    catch(err)
    {
        // error can be in any format
        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        console.log(message);
        
    }
}

export const addUser=async(userData)=>{
    try
    {
        // withCredentials help us to get cookies from backend to save in frontend
        const response=await axios.post(`${BACKEND_URL}/api/user/adduser`,userData,{
            withCredentials:true
        })

        console.log(response.data)
        
        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        console.error(message);
        
    }
}


export const removeUser=async(userData)=>{
    try
    {
        // withCredentials help us to get cookies from backend to save in frontend
        const response=await axios.post(`${BACKEND_URL}/api/user/removeuser`,userData,{
            withCredentials:true
        })

        console.log(response.data)
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();
        
        console.error(message);
        
    }
}

export const addPost=async(postURL,selectedUser,iconname)=>{
    try
    {
        const data = {'postURL':postURL,'selectedUser':selectedUser,'iconname':iconname}

        const response=await axios.post(`${BACKEND_URL}/api/insta/createpost`,data,{
            withCredentials:true
        })
        
        console.log(response.data)

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        console.error(message);
        
    }
}


export const likedHashtag=async(hashtag,selectedUser,iconname,hashtagCount)=>{
    try
    {
        const data = {'hashtag':hashtag,'selectedUser':selectedUser,'iconname':iconname,'hashtagCount':hashtagCount}

        const response=await axios.post(`${BACKEND_URL}/api/insta/likeHashtag`,data,{withCredentials:true})

        console.log(response.data)

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        console.error(message);
    }
}

export const sendFollowRequest=async(accountName,selectedUser,iconname)=>{
    try
    {
        const data={'accountName':accountName,'selectedUser':selectedUser,'iconname':iconname}

        const response=await axios.post(`${BACKEND_URL}/api/insta/followAccount`,data,{withCredentials:true})

        console.log(response.data)

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        console.error(message);
    }
}