import { ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react'
import { useThemeContext } from '../../src/contexts/ThemeContextProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@emotion/react'
import {useCookies} from 'react-cookie'
const Settings = ({ anchorEl, handleClose }) => {
    const open = Boolean(anchorEl);
    const [cookies,setCookies,removeCookies]= useCookies(null);
    const {mode,handleSetTheme}= useThemeContext();
    const theme=useTheme();
  return (
    <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        
    >
        <ListItem  > 
            <ListItemButton onClick={()=>{handleSetTheme(mode==='light'?'dark':'light')}}>
                <ListItemIcon>
                    {mode==='light'?<DarkModeIcon/>:<LightModeIcon/>}
                </ListItemIcon>
                <ListItemText sx={{
                color: theme.palette.text.secondary}}>Switch to {mode==='light'?'dark':'light'}Mode</ListItemText>
            </ListItemButton>
        </ListItem>

        <ListItem  > 
            <ListItemButton onClick={()=>{ removeCookies('token');}}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText sx={{
                color: theme.palette.text.secondary}}>Logout</ListItemText>
            </ListItemButton>
        </ListItem>
    </Popover>
  )
}

export default Settings
