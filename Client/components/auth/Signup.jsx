import { useTheme } from '@emotion/react'
import { Avatar, Badge, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { Component, useEffect, useState } from 'react'
import { userSignup } from '../../src/api/authApiHandler';
import { useAuthContext } from '../../src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useImageKitContext } from '../../src/contexts/ImageKitContext';
const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading,setLoading] = useState(null);
  const {setLoggedInUser} = useAuthContext()
  const [signUpData, setSignUpData] = useState({
    cPassword: "",
    email: "",
    fullName: "",
    imgUrl: "",
    password: "",
    showCP: false,
    showP: false
  });
  const {ikUploadRef,fileUrl,uploadImgLoading,setFileUrl} = useImageKitContext();
  //console.log('imgUrl:',signUpData?.imgUrl,fileUrl);

  useEffect(()=>{
    if(fileUrl){
      handleSignUpDataChange({key:"imgUrl",value:fileUrl??""})
    }
  },[fileUrl]);
  const handleSignUpDataChange = ({key,value})=>{
    setSignUpData((prev)=>{return{...prev,[key]:value}});
  } 

  const handleSignUp = async () =>{
    setLoading("signup");
    try {
      const response = await userSignup(signUpData);
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
        Sign Up
      </Typography>
      <Grid item display="flex" alignItems="center" gap={1}>
        <Badge
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            <Typography fontWeight="bold" color={theme.palette.error.main}>
              *
            </Typography>
          }
        >
          <Avatar src={signUpData?.imgUrl??""} />
        </Badge>

        <Button
          loading={uploadImgLoading}
          disabled={uploadImgLoading}
          onClick={() => {
            ikUploadRef &&
              ikUploadRef?.current &&
              ikUploadRef?.current?.click();
          }}
          variant="text"
        >
          Add profile picture
        </Button>
      </Grid>
      <TextField 
        value={signUpData.email} 
        placeholder='Enter your Email' 
        label='Email' required  
        type='email'
        onChange={(event)=>{handleSignUpDataChange({key:"email",value:event.target.value})}}
        InputProps={{
          style: { color: theme.palette.text.secondary }  // Change text color here
        }}
      />
      <TextField 
        value={signUpData.fullName} 
        placeholder='Enter your Full Name' 
        label='Name' required  
        type='text'
        onChange={(event)=>{handleSignUpDataChange({key:"fullName",value:event.target.value})}}
        InputProps={{
          style: { color: theme.palette.text.secondary }  // Change text color here
        }}

      />
      <TextField 
        value={signUpData.password} 
        placeholder='Enter your Password' 
        label='Password' required 
        type= {signUpData.showP?'text':'password'} 
        onChange={(event)=>{handleSignUpDataChange({key:"password",value:event.target.value})}}
        InputProps={{endAdornment:(
          <IconButton onClick={()=>{handleSignUpDataChange({key:"showP",value:!signUpData.showP})}}>
            {signUpData.showP?<VisibilityIcon/>:<VisibilityOffIcon/>}
          </IconButton>
          ),style: { color: theme.palette.text.secondary }}}
      />
      <TextField 
        value={signUpData.cPassword} 
        placeholder='Confirm your Password' 
        label='Confirm Password' required  
        type= {signUpData.showCP?'text':'password'} 
        onChange={(event)=>{handleSignUpDataChange({key:"cPassword",value:event.target.value})}}
        InputProps={{endAdornment:(
          <IconButton onClick={()=>{handleSignUpDataChange({key:"showCP",value:!signUpData.showCP})}}>
            {signUpData.showCP?<VisibilityIcon/>:<VisibilityOffIcon/>}
          </IconButton>
        ),style: { color: theme.palette.text.secondary }}}
      />
      <Button 
      loading={loading==="signup"}
      disabled={loading==="signup"}
      onClick={handleSignUp}
      variant='contained'>Sign up</Button>
    </Grid>
</Grid>
  )
}

export default Signup
