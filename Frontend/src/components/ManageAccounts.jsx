import React, { useEffect, useState } from 'react'
import { Button, Grid,Container, Typography} from '@mui/material'
import Profile from './Profile'
import { useLocation,useNavigate } from 'react-router-dom'
import { getUser } from '../services/Instagram/userService'

const ManageAccounts = () => {
    const {state} = useLocation();
    const [userData,setuserData]=useState([])
    const {iconname}=state

    const navigate = useNavigate();

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

    console.log(iconname)

  return (
    <>
        <Grid sx={{p:5,width:'100%'}} >
            
            <Container maxWidth='md' style={{marginTop:'50px'}} sx={{background:'#f5f5f5'}}>
            
                <Grid container direction={'column'} spacing={2} sx={{padding:'10px'}}>
                    <Grid item style={{textAlign: "end"}}>
                        <Button variant="contained" color="success" onClick={()=>navigate('/login')}>ADD</Button>
                    </Grid>

                    <Grid item style={{textAlign: "center"}}>
                        <Typography variant="h4" noWrap component="a" sx={{mr: 2,fontFamily: 'monospace',fontWeight: 700,letterSpacing: '.2rem'}}>
                            USERS
                        </Typography>
                    </Grid>
                    
                    {
                        userData && userData.map((user)=>
                            <Grid item key={user.username}>
                                <Profile username={user.username}/>
                            </Grid>
                        )
                    }
                    
                    
                </Grid>
            
            </Container>
        </Grid>
    </>
  )
}

export default ManageAccounts
