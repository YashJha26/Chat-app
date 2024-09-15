import { Divider, Drawer, Grid, List, useMediaQuery } from '@mui/material';
import React from 'react';
import ChatListHeader from './ChatListHeader';
import { useTheme } from '@emotion/react'
import SearchChatList from './SearchChatList';
import ChatListHeading from './ChatListHeading';
import ChatList from './ChatList';
//const drawerWidth = 320;

const ChatListDrawer = ({drawerWidth,conversation}) => {
  const theme=useTheme();
  const isTablet=useMediaQuery("(max-width:768px");
  return (
    <Grid sx={{ width: { sm: drawerWidth } }}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isTablet?'100%': drawerWidth,
          },
        }}
        open
      >
      <ChatListHeader/>
      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        <SearchChatList />
        <Divider />
        <ChatListHeading />
        <ChatList conversation={conversation}/>
      </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
