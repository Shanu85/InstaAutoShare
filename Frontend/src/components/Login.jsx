import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../services/Instagram/userService';
import { useSelector, useDispatch } from 'react-redux'
import {changeLoading} from '../redux/features/InstaSlice'
import Loader from '../components/loader/Loader'
import swal from 'sweetalert'
const defaultTheme = createTheme();



const Login = () => {


  const navigate=useNavigate()
  const isInstaLoading=useSelector((state)=>state.InstaLoader.isLoading)
  const dispatch = useDispatch()


  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let uname=data.get('uname')
    let password=data.get('password')

    if(!uname || !password)
    {
        alert('Please fill all the field...')
        return
    }

    

    const user_data={
      username: uname,
      password: password,
    };

    // reset values
    event.currentTarget.reset();

    dispatch(changeLoading())

    const {type,message}=await addUser(user_data)
    
    dispatch(changeLoading())

    if(type===1)
    {
      return swal(message,{icon:"error"})
    }

    swal(message,{icon:"success"})
    
    navigate('/')

  };
    
      return (
        <>
        {isInstaLoading?<Loader/>:
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                SignIn
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="uname"
                  label="Username or Email address"
                  name="uname"
                  autoComplete="email"
                  autoFocus
                  />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  >
                  Sign-in
                </Button>
                
              </Box>
            </Box>
            
          </Container>
        </ThemeProvider>
      }
      </>
    );
}

export default Login