import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid} from '@mui/material';

const Navbar = () => {
  return (
    <>

        <Grid item sm={12}>
                <AppBar position="static">
                  <Container maxWidth="xl">
                      <Toolbar disableGutters> {/*Toolbar is to display its children with an inline display (elements are placed next to each other),*/}
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                              variant="h6"
                              noWrap
                              component="a"
                              href="/"
                              sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                              }}
                          >
                              REPOST TOOL
                          </Typography>
                      </Toolbar>
                  </Container>
                </AppBar>
          </Grid>
    </>
  )
}

export default Navbar
