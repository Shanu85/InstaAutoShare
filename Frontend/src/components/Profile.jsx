import React from 'react'
import { Button, Grid,Typography } from '@mui/material'
import ProfileIcon from '../assets/profile-icon.svg'
import { removeUser } from '../services/Instagram/userService'
import { useNavigate } from 'react-router-dom'

const Profile = ({username}) => {

  const navigate=useNavigate()


  const deleteUser=async(username)=>{
      const data={username:username}

      await removeUser(data)

      navigate('/')
  }

  return (
    <>
    <Grid container spacing={2}>
        <Grid item xs={2}>
            <img src={ProfileIcon} alt='profile' height={'65%'} width={'65%'}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="h6" noWrap component="a" sx={{mr: 2,fontWeight: 500}}>
                    {username}
            </Typography>
        </Grid>
        
        <Grid item xs={2}>
            <Button variant="contained" color="error" onClick={()=>deleteUser(username)}>Delete</Button>
        </Grid>
    </Grid>
    </>
  )
}

export default Profile
