import { Button, Grid,Card} from '@mui/material'
import React from 'react'
import {useNavigate} from "react-router-dom"


const AppComponent = ({icon,iconname,height,width}) => {
    const navigate = useNavigate();



  return (
    <>
    <Card sx={{p:10,background:'#f5f5f5'}}>
      <Grid container spacing={5} direction={'column'} style={{textAlign: "center"}}>
        
        <Grid item>
            <img src={icon} alt={iconname} height={height} width={width}/>
        </Grid>
        
        <Grid item>
            <Button variant="contained" color="success" onClick={()=>navigate('/manage',{state:{iconname:iconname}})}>
                Manage Accounts
            </Button>
        </Grid>

        <Grid item>
            <Button variant="contained" color="success" onClick={()=>navigate('/postcontent',{state:{iconname:iconname,Clicktype:1}})}>
                Like Hashtag Posts 
            </Button>
        </Grid>

        <Grid item>
            <Button variant="contained" color="success" onClick={()=>navigate('/postcontent',{state:{iconname:iconname,Clicktype:2}})}>
                Send Follow Request 
            </Button>
        </Grid>
        
        <Grid item>
            <Button variant="contained" color="success" onClick={()=>navigate('/postcontent',{state:{iconname:iconname,Clicktype:3}})}>
                Post Content
            </Button>
        </Grid>


      </Grid>
      </Card>
    </>
  )
}

export default AppComponent
