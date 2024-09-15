import { Grid, Paper, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import Login from './Login';
import Signup from './Signup';

function CustomTabPanel({ children, value, index }) {  
    return value === index && children;
  }
const Auth = () => {
    const [tabValue,setTabValue]=useState(0);
    const handleTabChange = (event,newValue) =>{
        console.log(event,newValue);
        setTabValue(newValue);
    }
  return (
    <Grid container width="100%" height="100vh" justifyContent="center" alignItems="center" >
        <Grid item display='flex' flexDirection='column' gap={2} height="500px">
            <Tabs value={tabValue} onChange={handleTabChange} component={Paper}>
                <Tab label='Log in'/>
                <Tab label='sign up'/>
            </Tabs>
            <CustomTabPanel value={tabValue} index={0}>
                <Login />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <Signup />
            </CustomTabPanel>
        </Grid>
    </Grid>
  )
}

export default Auth
