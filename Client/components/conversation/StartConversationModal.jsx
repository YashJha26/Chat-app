import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AddUserListItem from "../../shared/AddUserListItem";
import { useConversationContext } from "../../src/contexts/ConversationContext";
import NoDataAvailable from "../../shared/NoDataAvailable";


const StartConversationModal = ({open,onClose,type}) => {
  const isTablet= useMediaQuery("(max-width:760px)");
  const theme = useTheme();
  const {
    allUsers,
    handleSearchUserChange,
    searchUserValue,
    handleCreateConversation,
    selectedUsersForConversation,setSelectedUsersForConversation,
    groupTitle,setGroupTitle,
  }=useConversationContext();
  //console.log("allUsersProp",allUsers);
  const renderUser = (userList) =>{
    return (userList?.map((user)=>{
      return <AddUserListItem 
        key={user?.id} 
        user={user} 
        selectedUsers={selectedUsersForConversation}
        setSelectedUsers={setSelectedUsersForConversation}
        type={type}
      />}));
  }

  const handleClose = () =>{
    onClose();
    setSelectedUsersForConversation([]);
  }
  //console.log(type);
  return (
    <Dialog
      onClose={handleClose}
      maxWidth="lg"
      open={open}
      fullScreen={isTablet}
    >
      <DialogTitle color={theme.palette.text.secondary}>
        Select users to start a conversation
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          flexDirection="column"
          gap={2}
          sx={{ width:isTablet?"100%":"600px" }}
        >
            <TextField
                size="small"
                placeholder="Search users to start conversation"
                variant="outlined"
                value={searchUserValue}
                onChange={handleSearchUserChange}
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.text.secondary,
                  },
                }}
                
            />
           {type=="GROUP" && <TextField
              size="small"
              required
              label="Group Title"
              placeholder="Please enter a group title"
              variant="outlined"
              value={groupTitle}
              onChange={(event)=>{setGroupTitle(event.target.value)}}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.text.secondary,
                },
              }}
            />}

          <Grid item display='flex' flexDirection='column' gap={1} maxHeight='300px' sx={{overflowY:'scroll'}}>
           {
           //console.log(allUsers && Array.isArray(allUsers) && allUsers.length>0)
           }
            {allUsers && Array.isArray(allUsers) && allUsers.length>0
              ?renderUser(allUsers)
              :<NoDataAvailable message="No user found"/>
            }
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
        > Close</Button>
        <Button   
          variant="contained" 
          onClick={handleCreateConversation}
          sx={{
            bgcolor: theme.palette.primary.main,
          }}
          disabled={
            type === "GROUP"
              ? !groupTitle||!groupTitle?.trim().length|| !selectedUsersForConversation?.length
              : !selectedUsersForConversation?.length
          }
        >Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartConversationModal;