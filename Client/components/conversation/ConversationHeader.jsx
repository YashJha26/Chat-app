import React, { useState } from 'react'
import { useTheme } from '@emotion/react';
import { AppBar, Avatar, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuthContext } from '../../src/contexts/AuthContext';
import { useConversationContext } from '../../src/contexts/ConversationContext';
const ConversationHeader = ({drawerWidth}) => {
    const isTablet=useMediaQuery("(max-width:768px");
    const theme=useTheme();
    const { loggedInUser } = useAuthContext();
    const {
        currentConversation,
        handleGoToHome,
        chatAnchorEl, 
        setChatAnchorEl,
        handleDeleteConversation,
        numberOfOnlineUsersInCurrentConversation,setNumberOfOnlineUsersInCurrentConversation
    } = useConversationContext(); 

    const isOnlineGroup = 
        currentConversation?.isGroup && 
        !!numberOfOnlineUsersInCurrentConversation&&
        numberOfOnlineUsersInCurrentConversation-1>=1
        ?`${numberOfOnlineUsersInCurrentConversation-1} Online`:null; //-1 because , you don't want to include youself
    const isOnlineDm = 
        !currentConversation?.isGroup&&
        !!numberOfOnlineUsersInCurrentConversation&&
        numberOfOnlineUsersInCurrentConversation-1===1?`Online`:null;
    //console.log(numberOfOnlineUsersInCurrentConversation);
    const notCurrentUser = currentConversation?.members?.find(
        (member) => member?.userId !== loggedInUser?.user?.id
    );

    const conversationTitle= currentConversation?.type === "DIRECT_MESSAGE"
        ?notCurrentUser?.user?.name
        :currentConversation?.groupTitle;
    const conversationImageUrl = currentConversation?.type === "DIRECT_MESSAGE"?notCurrentUser?.user?.imageUrl : "";

    const handleSettingsClick = (event) => {
        setChatAnchorEl(event.currentTarget); // Set the anchor element to the SettingsIcon
      };

      const handleClose = () => {
        setChatAnchorEl(null); // Close the popover
      };
  return (
    <AppBar 
        position='fixed' 
        color='transparent' 
        sx={{width:isTablet?"100%":`calc(100% - ${drawerWidth}px)`, backgroundColor: theme.palette.text.primary}} 
    >
        <Toolbar >
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item display='flex' gap={1}>
                    {isTablet && 
                        <IconButton onClick={handleGoToHome}>
                            <ArrowBackIcon/>
                        </IconButton>
                    }
                    <IconButton>
                        <Avatar src={conversationImageUrl??""}/>
                    </IconButton>
                    <Grid item>
                        <Typography color={theme.palette.text.secondary}>{conversationTitle??""}</Typography>
                        {
                        isOnlineGroup||isOnlineDm && 
                        <Typography color={theme.palette.text.secondary} variant='caption'>
                            {isOnlineGroup?isOnlineGroup:(isOnlineDm?isOnlineDm:null)}
                        </Typography>
                        }
                    </Grid>
                </Grid>
                <IconButton onClick={handleSettingsClick}>
                    <MoreVertIcon />
                </IconButton>
                <Popover 
                    anchorEl={chatAnchorEl} 
                    onClose={handleClose} 
                    open={Boolean(chatAnchorEl)}
                    anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                >
                    <ListItem  > 
                        <ListItemButton onClick={handleGoToHome}>
                            <ListItemIcon>
                                <CloseIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{
                            color: theme.palette.text.secondary}}>Close</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem  > 
                        <ListItemButton onClick={handleDeleteConversation}>
                            <ListItemIcon>
                                <DeleteIcon color='error'/>
                            </ListItemIcon>
                            <ListItemText sx={{
                            color: theme.palette.text.secondary}}>Delete</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Popover>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}

export default ConversationHeader
