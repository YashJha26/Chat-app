import { useTheme } from '@emotion/react'
import { Button, Grid,IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { Component, useState } from 'react'
import { userLogin, userSignup } from '../../src/api/authApiHandler';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuthContext } from '../../src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const theme = useTheme();
  const navigate=useNavigate();
  const [loading,setLoading] = useState(null);
  const {setLoggedInUser} = useAuthContext();
  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
    showP:false
  })

  const handleLoginpDataChange = ({key,value})=>{
    setLoginData((prev)=>{return{...prev,[key]:value}});
  } 

  const handleLogin = async () =>{
    setLoading('login');
    try {
      const response = await userLogin(loginData);
      if(response && response?.data){
        setLoggedInUser({isAuthenticated:true,user:response?.data});
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.toString() ?? "Failed to login please try again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(null);
  }
  return (
    <Grid container justifyContent="center" alignItems="center">
        <Grid 
            container 
            flexDirection="column" 
            gap={2} sx={{width:{xs:'300px',sm:'400px',md:'500px'}} } 
            component={Paper} 
            variant='elevation' 
            p={{ xs: 2, sm: 4, md: 8 }}
        >
          <Typography variant='h5' color={theme.palette.text.secondary}>
            Log In
          </Typography>
          <TextField 
            placeholder='Enter your Email' 
            label='Email' required 
            type='email' 
            value={loginData.email}
            InputProps={{
              style: { color: theme.palette.text.secondary }  // Change text color here
            }}
            onChange={(event)=>{handleLoginpDataChange({key:"email",value:event.target.value})}}
          />
          <TextField  
            placeholder='Enter your Password' 
            label='Password' required 
            type={loginData.showP?'text':'password'}
            value={loginData.password}
            InputProps={{endAdornment:(
              <IconButton onClick={()=>{handleLoginpDataChange({key:"showP",value:!loginData.showP})}}>
                {loginData.showP?<VisibilityIcon/>:<VisibilityOffIcon/>}
              </IconButton>
              ),style: { color: theme.palette.text.secondary }}}
            onChange={(event)=>{handleLoginpDataChange({key:"password",value:event.target.value})}}
          />
          <Button 
            variant='contained'
            loading={loading==="login"}
            disabled={loading==="login"}
            onClick={handleLogin}
          >Log In</Button>
        </Grid>
    </Grid>
  )
}

export default Login
