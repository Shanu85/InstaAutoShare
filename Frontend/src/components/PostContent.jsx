import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addPost, getUser, likedHashtag, sendFollowRequest } from '../services/Instagram/userService';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import ProfileIcon from '../assets/profile-icon.svg'
import { useSelector, useDispatch } from 'react-redux'
import {changeLoading} from '../redux/features/InstaSlice'
import Loader from '../components/loader/Loader'
import swal from 'sweetalert'

const PostContent = () => {
    const {state} = useLocation();
    const {iconname,Clicktype}=state
    const navigate=useNavigate()
    const [userData,setuserData]=useState([])

    const isInstaLoading=useSelector((state)=>state.InstaLoader.isLoading)
    const dispatch = useDispatch()

    const [selectedUser,setselectedUser]=useState([])

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await getUser();
              setuserData(response)
            } catch (error) {
              console.log(error);
            }
          };
        fetchData();
    },[])

    const addUser=(username)=>{
        let newdata=[...selectedUser,username]
        setselectedUser(newdata)
    }

    const messagePopup=(type,message)=>{
        dispatch(changeLoading())

        if(type===1)
        {
            swal(message,{icon:"error"})
        }
        else
        {
            swal(message,{icon:"success"})
        }
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(selectedUser.length<1)
        {
            alert("Please select atleast one user ...")
            return
        }
        let postURL=data.get('postURL')

        if(!postURL)
        {
            const temp=Clicktype===1?"Hashtag":Clicktype===2?"Account name":"Post URL"

            alert( `Please enter ${temp} ....`)

            return
        }

        dispatch(changeLoading())

        // TODO: check here
        
        
        if(Clicktype===1)
        {
            let hashtagCount=data.get('hashtagCount')
            const {type,message}=await likedHashtag(postURL,selectedUser,iconname,hashtagCount)
            messagePopup(type,message)
        }
        else if(Clicktype===2)
        {
            const {type,message}=await sendFollowRequest(postURL,selectedUser,iconname)

            messagePopup(type,message)
        }
        else
        {
            const {type,message}=await addPost(postURL,selectedUser,iconname)
            messagePopup(type,message)
        }
        
        navigate('/')

    }

  return (
    <>
        { isInstaLoading ?<Loader/>:
        <Grid sx={{p:5,width:'100%'}}>
            <Container maxWidth='md' style={{marginTop:'50px'}} sx={{background:'#f5f5f5'}}>
                <Grid container direction={'column'} spacing={2} sx={{padding:'10px'}}>
                    <Grid item style={{textAlign: "center"}}>
                        <Typography variant="h4" noWrap component="a" sx={{mr: 2,fontFamily: 'monospace',fontWeight: 700,letterSpacing: '.2rem'}}>
                            SELELCT USERS
                        </Typography>
                    </Grid>


                    {
                        userData && userData.map((user)=>
                            <Grid item key={user.username}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <img src={ProfileIcon} alt='profile' height={'65%'} width={'65%'}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" noWrap component="a" sx={{mr: 2,fontWeight: 500}}>
                                                {user.username}
                                        </Typography>
                                    </Grid>
                                    
                                    {
                                        selectedUser.includes(user.username) ? 
                                        
                                        <Grid item xs={4}>
                                        <Button variant="contained" color="error"  onClick={()=>setselectedUser(selectedUser.filter((item) => item !== user.username))}>Remove User</Button>
                                        </Grid>
                                        :
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="success" onClick={()=>addUser(user.username)}>Selected User</Button>
                                        </Grid>
                                    }
                                    
                                </Grid>
                            </Grid>
                        )
                    }

                    <Grid item>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{textAlign: "center",marginTop:'50px'}} >
                            <TextField margin="normal" required fullWidth id="postURL" label={Clicktype===1?"Hashtag":Clicktype===2?"Account name":"PostURL"} name="postURL" autoFocus/>
                            
                            {Clicktype===1 ?<TextField type="number" InputProps={{inputProps: { max: 10000, min: 1 }}} label="Like below number of post "
                            id='hashtagCount' name='hashtagCount' fullWidth autoFocus required style={{marginTop:"20px"}}/>
                                : 
                                <></>}

                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>

                    
                </Grid>
            </Container>
        </Grid>
        }
    </>
  )
}

export default PostContent
