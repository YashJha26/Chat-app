import { Avatar, Grid, IconButton, MenuItem, Popover, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useAuthContext } from '../../src/contexts/AuthContext'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from '@mui/icons-material/Delete';
import { useMessage } from '../../src/api/messageHandler';
import ViewAttachFileMedia from './ViewAttachFileMedia';

const checkIfMessageIsFileUrl = (url) => {
    const regex = new RegExp("https://ik\\.imagekit\\.io/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+\\.[a-zA-Z0-9]+");
    return regex.test(url);
};
const MessageCard = ({message,messagesEndRef,passRef}) => {
    const isTablet = useMediaQuery("(max-width:760px)");
    const {loggedInUser}=useAuthContext();
    const theme=useTheme();
    const {handleDeleteMessage,messageCardAnchorEl,setMessageCardAnchorEl} = useMessage();
    const isFileUrl = checkIfMessageIsFileUrl(message?.fileUrl);
    //console.log("message",message);
    //console.log("loggedInUser",loggedInUser);
  return (
    <>
    <Grid 
        ref={passRef?messagesEndRef:null}
        p={1} 
        item display='flex' 
        alignItems='center' 
        gap={2} 
        maxWidth={isTablet?"90%":"35%"}
        alignSelf={loggedInUser?.user?.id===message?.sender?.userId ? 'flex-end':'flex-start'}
        flexDirection={message?.sender?.userId===loggedInUser?.user?.id ? 'row-reverse':'row'}
    >
            {!isTablet&&<Avatar src={message?.sender?.user?.imageUrl??""} />}
            <Grid 
                item 
                display='flex' 
                flexDirection='column' 
                gap={1} p={1} 
                sx={{bgcolor:message?.sender?.userId === loggedInUser?.user?.id 
                        ?theme.palette.primary.main
                        :theme.palette.grey[900],
                    borderRadius:4,
                    }}
            >
                <Grid container spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Grid container spacing={2}>
                            <Grid item zeroMinWidth width="100%">
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs zeroMinWidth>
                                        {isFileUrl
                                            ?<ViewAttachFileMedia src={message?.fileUrl}/>
                                            :<Typography color={theme.palette.text.primary}>
                                                {message?.body}
                                            </Typography>
                                        }
                                    </Grid>
                                    {message?.sender?.userId===loggedInUser?.user?.id && (
                                        <Grid item alignSelf='flex-start'>
                                            <IconButton 
                                                sx={{color:theme.palette.common.white}} 
                                                onClick={(event)=>{setMessageCardAnchorEl(event.currentTarget)}}
                                            >
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/*rest of the code*/}
                <Grid item display='flex' justifyContent='flex-end' alignItems='center' gap={1 }>
                    <Typography variant='caption' color={theme.palette.text.primary}>
                        {new Date(message?.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </Typography>
                </Grid>
            </Grid>
    </Grid>
    {
        <Popover 
            open={Boolean(messageCardAnchorEl)} 
            anchorEl={messageCardAnchorEl} 
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            onClose={()=>{setMessageCardAnchorEl(null);}}
        >
            <MenuItem>
                <Grid 
                    item 
                    display='flex'
                    alignItems='center' 
                    gap={1}
                    onClick={()=>{handleDeleteMessage(message)}}
                >
                    <IconButton>
                        <Delete color='error'/>
                    </IconButton>
                    <Typography color={theme.palette.text.secondary}>
                        Delete
                    </Typography>
                </Grid>
            </MenuItem>
        </Popover>
    }
    </>
    
  )
}

export default MessageCard
