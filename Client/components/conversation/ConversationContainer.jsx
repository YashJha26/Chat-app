
import React, { useState } from 'react'
import ConversationHeader from './ConversationHeader';
import { Grid, Toolbar, useMediaQuery } from '@mui/material';
import MessageList from './MessageList';
import SendMessageConainer from './SendMessageConainer';
const drawerWidth = 320;
const ConversationContainer = () => {
  const isTablet=useMediaQuery("(max-width:768px)");
  return (
    <Grid 
      container 
      flexDirection='column' 
      width={isTablet?"100%":`calc(100% - ${drawerWidth}px)`} 
      sx={{ml:isTablet?"0px":`${drawerWidth}px`}} 
    >
       <ConversationHeader drawerWidth={drawerWidth}/>
       <Toolbar/>
        <MessageList />
        <SendMessageConainer />
    </Grid>
  )
}

export default ConversationContainer
