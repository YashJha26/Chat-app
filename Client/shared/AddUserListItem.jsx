import { useTheme } from '@emotion/react'
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const AddUserListItem = ({user,selectedUsers,setSelectedUsers,type}) => {
    console.log(type);
    const theme = useTheme();
    const isCurrentUserSelected= selectedUsers?.find((item)=>{return item.id===user.id});
    const handleSelectUser = () =>{
        if(type==='DIRECT_MESSAGE'){
            setSelectedUsers([user]);
        }else{
            setSelectedUsers((prev)=>{
                if(isCurrentUserSelected){
                    return prev.filter((item)=>item?.id!==user?.id);
                }else{
                    return [...prev,user];
                }
            })
        }
    }
  return (
    <ListItem 
        sx={{
            color:theme.palette.common.white,
            bgcolor:isCurrentUserSelected
                ?theme.palette.primary.main
                :theme.palette.divider,
            borderRadius:4,
        }}
    >
        <ListItemButton 
            sx={{borderRadius:4}} 
            selected={!!isCurrentUserSelected} 
            onClick={handleSelectUser}
        >
            <ListItemIcon>
                <Avatar sx={{color:theme.palette.text.secondary}} src={user.imageUrl??""}/>
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{color:theme.palette.text.secondary,variant:"h6"}}>{user.name}</ListItemText>
            <ListItemIcon></ListItemIcon>
        </ListItemButton>
    </ListItem>
  )
}

export default AddUserListItem
