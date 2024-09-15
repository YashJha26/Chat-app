import { IconButton, ListItem, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { useTheme } from '@emotion/react';
import { useConversationContext } from '../../src/contexts/ConversationContext';

const SearchChatList = () => {
  const theme=useTheme();
  const {searchConversationValue,setSearchConversationValue} = useConversationContext();
  return (
    <ListItem>
        <TextField id="outlined-basic" label="search" variant="outlined" fullWidth
          sx={{
            borderRadius: '12px',
            
            '& .MuiOutlinedInput-root': {
              '& input': {
                 color: theme.palette.text.secondary, // Set the text color here
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main, // Change border color on hover
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '20px', // Ensure the outline itself is rounded
              }
            }
          }}
          value={searchConversationValue}
          onChange={(event)=>{setSearchConversationValue(event.target.value)}}
          InputProps={{endAdornment:(<IconButton sx={{color:theme.palette.primary.main}}><SearchIcon/></IconButton>)}}

        />
    </ListItem>
  )
}

export default SearchChatList
