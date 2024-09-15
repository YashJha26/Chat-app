import { Avatar, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useAuthContext } from '../../src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatListItem = ({conversation,currentConversation,newMessagesInConversation}) => {
    //console.log("conversationMember",conversation?.members);
    const theme=useTheme();
    const navigate = useNavigate();
    const {loggedInUser} = useAuthContext();
    const currentMember = conversation?.members?.find((member)=>{return member?.userId !== loggedInUser?.user?.id});
    const conversationTitle = conversation?.type === "DIRECT_MESSAGE"?currentMember?.user?.name : conversation?.groupTitle;
    const conversationImageUrl = conversation?.type === "DIRECT_MESSAGE"?currentMember?.user?.imageUrl : "";
    const newMessage=
    currentConversation?.id!==conversation?.id 
    ? newMessagesInConversation?.find(
        (msg)=>msg?.conversationId===conversation?.id
      )
    :null;
    //console.log("newMessagesInConversation",newMessagesInConversation);
  return (
    <ListItem disablePadding sx={{bgcolor:theme.palette.divider,mt:1}}>
        <ListItemButton selected={currentConversation?.id===conversation?.id}
            sx={{
                '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main, 
                    color:theme.palette.common.white
                },
            }}
            onClick={()=>{navigate(`/chat/${conversation?.id}`,{state:conversation})}}
        >
            <ListItemIcon>
                <Avatar src={conversationImageUrl??""} />
            </ListItemIcon>
            <Grid container flexDirection="column">
                <ListItemText >{conversationTitle??""}</ListItemText>
                {newMessage && <Typography variant='body1' fontWeight="bold">{newMessage?.body??""}</Typography>}
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}

export default ChatListItem
