import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, rgbToHex } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useTheme } from '@emotion/react';
import StartConversationModal from '../conversation/StartConversationModal';
import { useConversationContext } from '../../src/contexts/ConversationContext';
const ChatListHeading = () => {
    const theme = useTheme();
    const {anchorEl,setAnchorEl,openNewConversationModal,setOpenNewCoversationModal} = useConversationContext();
    const isOpen = Boolean(anchorEl);
    // const handleAddClick = (event) => {
    //     setAnchorEl(event.currentTarget); 
    //   };
  
    //   const handleClose = () => {
    //     setAnchorEl(null); 
    //   };
  return (
    <>
        <ListItem>
            <ListItemText sx={{color:theme.palette.text.secondary}}>Chats</ListItemText>
            <ListItemIcon>
                <IconButton 
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            color:theme.palette.text.secondary , // Custom background color on hover 
                            bgcolor:theme.palette.mode=='dark'?"#464646": "#bbbbbb",
                        }
                    }}
                    onClick={(event)=>{setAnchorEl(event.currentTarget);}}
                    >
                    <AddIcon  />
                </IconButton>
                    <Popover open={isOpen} anchorEl={anchorEl} onClose={()=>{setAnchorEl(null);}} 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        >
                        <ListItem>
                            <ListItemButton onClick={()=>{setOpenNewCoversationModal({isOpen:true,type:"DIRECT_MESSAGE"})}}>
                                <ListItemIcon>
                                    <IconButton>
                                        <AddCommentIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText sx={{color:theme.palette.text.secondary}}>
                                    Add Chat
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={()=>{setOpenNewCoversationModal({isOpen:true,type:"GROUP"})}}>
                                <ListItemIcon>
                                    <IconButton>
                                        <GroupAddIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText sx={{color:theme.palette.text.secondary}}>
                                    Add Group
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Popover>
            </ListItemIcon>
        </ListItem>
        {
            openNewConversationModal.isOpen && 
            <StartConversationModal 
                open={openNewConversationModal.isOpen} 
                onClose={()=>{setOpenNewCoversationModal({isOpen:false,type:"DIRECT_MESSAGE"})}}
                type= {openNewConversationModal.type}
            />
        }
    </>
  )
}

export default ChatListHeading
