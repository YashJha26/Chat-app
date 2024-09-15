import { Box, Divider, Grid, IconButton, Popover, TextField, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
//import { useTheme } from '@emotion/react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useMessage } from '../../src/api/messageHandler';
import ViewAttachFileModal from './ViewAttachFileModal';
const SendMessageConainer = () => {
    const isTablet = useMediaQuery("max-width:768px");
    const theme=useTheme();
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const {
      messageBody,
      setMessageBody,
      handleSendMessage,
      handleCloseAttachedFilesModal,
      openAttachedModal,
      ikUploadRef,
      uploadImgLoading,
      handleDeleteImageKitFile,
    } = useMessage();
    const handleEmojiClick = (event)=>{
        setEmojiPickerAnchorEl(event.currentTarget);
    }
    const handleEmojiClose = ()=>{
        setEmojiPickerAnchorEl(null);
    }
  return (
    <>
        <Divider />
        <Grid
        item
        py={1}
        px={isTablet?1:5}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <TextField 
             sx={{
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.secondary, // Set text color
                bgcolor:theme.palette.text.primary,
                '& .MuiInputBase-input': {
                  color: theme.palette.text.secondary, // Ensure the input text is secondary color
                },
              },
            }}
            placeholder='SendMessage' 
            fullWidth multiline maxRows={2}
            value={messageBody?.body}
            onChange={(event)=>{setMessageBody({body:event.target.value})}}
            onKeyDown={(event)=>{
              if((event.key==='Enter' && messageBody?.body?.length>0 )|| messageBody?.fileId ){
                event.stopPropagation();
                handleSendMessage();
              }
            }}
            InputProps={{endAdornment:(
                <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ color: theme.palette.primary.main }} onClick={handleEmojiClick}>
                  <EmojiEmotionsIcon />
                </IconButton>
                <IconButton 
                  sx={{ color: theme.palette.primary.main }} 
                  onClick={()=>{
                    ikUploadRef&&
                    ikUploadRef?.current && 
                    ikUploadRef?.current?.click();
                  }}
                >
                  <AttachFileIcon />
                </IconButton>
                <IconButton 
                  sx={{ color: theme.palette.primary.main }} 
                  onClick={handleSendMessage} 
                  disabled={uploadImgLoading}
                >
                    <SendIcon />
                </IconButton>
              </Box>
            )}}
        />
        <Popover 
            anchorEl={emojiPickerAnchorEl} 
            onClose={handleEmojiClose} 
            open={Boolean(emojiPickerAnchorEl)}
            anchorOrigin={{vertical:'top',horizontal:'left'}} 
        >
            <Picker data={data}  
              onEmojiSelect={
                (emoji)=>{
                  console.log(emoji);
                  setMessageBody((prev)=>{return ({...prev,body:`${prev.body}${emoji.native}`})});
                }
            } 
            />
        </Popover>
      </Grid>
      {openAttachedModal && 
      <ViewAttachFileModal 
        open={openAttachedModal} 
        onClose={handleCloseAttachedFilesModal}
        messageBody={messageBody}
        handleSendMessage={handleSendMessage}
        handleDeleteImageKitFile={handleDeleteImageKitFile}
      />
      }
    </>
  )
}

export default SendMessageConainer
