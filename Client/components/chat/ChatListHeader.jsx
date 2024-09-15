import { useTheme } from '@emotion/react'
import { Grid, IconButton, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import Settings from './Settings';
import { useState } from 'react';
import { useConversationContext } from '../../src/contexts/ConversationContext';
import { useAuthContext } from '../../src/contexts/AuthContext';
const ChatListHeader = () => {
    const theme=useTheme();
    const {handleGoToHome}=useConversationContext();
    const {loggedInUser}=useAuthContext();
    //console.log(theme.palette);
    const [anchorEl, setAnchorEl] = useState(null);
    const isTablet=useMediaQuery("(max-width:768px");
    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget); // Set the anchor element to the SettingsIcon
      };

      const handleClose = () => {
        setAnchorEl(null); // Close the popover
      };

  return (
    <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
            <Tooltip title={loggedInUser?.user?.name??""} color={theme.palette.text.secondary} >
                <Typography variant='h5' maxWidth="65%" noWrap>{loggedInUser?.user?.name??""}</Typography>
            </Tooltip>
            <Grid item display='flex' alignItems='center' justifyContent='center' gap={1}> 
              {!isTablet&&<IconButton 
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    '&:hover': {
                                color:theme.palette.text.secondary , // Custom background color on hover 
                                bgcolor:theme.palette.mode=='dark'?"#464646": "#bbbbbb",
                      }
                }}
                onClick={handleGoToHome}
              >
                <HomeIcon />
              </IconButton>}
              <IconButton sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  '&:hover': {
                              color:theme.palette.text.secondary , // Custom background color on hover 
                              bgcolor:theme.palette.mode=='dark'?"#464646": "#bbbbbb",
                  }
                }}
                onClick={handleSettingsClick}
              >
                <SettingsIcon />
              </IconButton></Grid>
           
            <Settings anchorEl={anchorEl} handleClose={handleClose} />
        </Grid>
    </Toolbar>
  )
}

export default ChatListHeader
