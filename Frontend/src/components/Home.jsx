import * as React from 'react';
import Container from '@mui/material/Container';
import InstaIcon from '../assets/icons8-instagram.svg'
import TiktokIcon from '../assets/tiktok-icon.svg'
import { Grid,CssBaseline } from '@mui/material';
import AppComponent from './AppComponent';

const Home=()=> {

  return (
    <>
        <Grid container spacing={5} direction={'row'}>
            <Grid item sm={12} >
                <Container maxWidth='md' style={{marginTop:'100px'}}>
                    <CssBaseline/>

                    <Grid container spacing={5} direction={'row'} >
                        {/* <Grid item sm={6} >  
                            <AppComponent icon={TiktokIcon} iconname={'tiktok'} height={'30%'} width={'30%'}/>
                        </Grid> */}

                        <Grid item sm={3}/>
                        
                        <Grid item sm={6}>
                            <AppComponent icon={InstaIcon} iconname={'instagram'} height={'35%'} width={'35%'}/>
                        </Grid>
                     </Grid>

                </Container>
            </Grid>
        </Grid>
    </>
  );
}
export default Home;