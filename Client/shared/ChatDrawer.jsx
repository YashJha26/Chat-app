import { Grid, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import ChatListDrawer from '../components/chat/ChatListDrawer'
import ConversationContainer from '../components/conversation/ConversationContainer'
import { useConversationContext } from '../src/contexts/ConversationContext'
import { useLocation } from 'react-router-dom'
import NoChatOpen from './NoChatOpen'
const drawerWidth = 320;
const ChatDrawer = () => {
  const isTablet=useMediaQuery("(max-width:768px");
  const {state} = useLocation();
  const {conversation,currentConversation,setCurrentConversation}=useConversationContext()
  useEffect(()=>{
    if(state && state?.type){
      setCurrentConversation &&setCurrentConversation(state);
    }else{
      setCurrentConversation&&setCurrentConversation(null);
    }
  },[state,setCurrentConversation])
  return (
    <Grid container>
      {isTablet&&currentConversation?.id?null:<ChatListDrawer conversation={conversation} drawerWidth={drawerWidth}/>}
      {
      currentConversation&&currentConversation?.id
        ?<ConversationContainer />
        :(!isTablet&&<NoChatOpen drawerWidth={drawerWidth}/>)
      }
      
    </Grid>
  )
}

export default ChatDrawer
