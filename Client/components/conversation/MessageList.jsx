import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { useConversationContext } from '../../src/contexts/ConversationContext'
import MessageCard from './MessageCard';

const MessageList = ({drawerWidth}) => {
  const {allMessages,messagesEndRef}= useConversationContext();
  //console.log("messages",allMessages);
  const isTablet=useMediaQuery("(max-width:768px)");
  return (
    <Grid
      container
      height={`calc(100vh - 138px)`}
      sx={{
        overflowY: "scroll",
        flexWrap: "nowrap",
        //ml:isTablet?"138px":"10px",
      }}
      p={2}
      flexDirection="column"
      gap={1}
    >
      {
        allMessages && 
        Array.isArray(allMessages) && 
        allMessages?.length>0 && 
        allMessages.map((message,index)=>{return <MessageCard 
          key={message.id} 
          message={message} 
          messagesEndRef={messagesEndRef} 
          passRef={index === allMessages?.length -1}
        />})
      } 
    </Grid>
  )
}

export default MessageList
