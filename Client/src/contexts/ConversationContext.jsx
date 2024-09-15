import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getAllUsers } from "../api/usersApiHandler";
import { useAuthContext } from "./AuthContext";
import { createConversation, deleteConversation, getConversation } from "../api/conversationApiHandler";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMessage } from "../api/messageHandler";
import { useSocketContext } from "./SocketContextProvider";


export const conversationContext = createContext()


const  ConversationContextProvider = ({children})=>{
  const navigate=useNavigate();
  const {socket} = useSocketContext()
  const {loggedInUser} = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNewConversationModal,setOpenNewCoversationModal] = useState({isOpen:false,type:"DIRECT_MESSAGE"});
  const [allUsers,setAllUsers]=useState([]);
  const [searchUserValue,setSearchUserValue]=useState("");
  const [selectedUsersForConversation,setSelectedUsersForConversation]=useState([]);
  const [groupTitle,setGroupTitle] = useState('');
  const [conversation,setConversation] = useState([]);
  const [searchConversationValue,setSearchConversationValue]=useState("");
  const [currentConversation,setCurrentConversation]=useState(null);
  const [allMessages,setAllMessages] = useState([]);
  const [chatAnchorEl, setChatAnchorEl] = useState(null);
  const [numberOfOnlineUsersInCurrentConversation,setNumberOfOnlineUsersInCurrentConversation]=useState(0);
  const [newMessagesInConversation,setNewMessagesInConversation]=useState([]);
  const messagesEndRef = useRef(null);

  const handleGetUsers =useCallback(async (searchUserValue)  => {
      const users = await getAllUsers(searchUserValue);
      if (users && Array.isArray(users) && users.length > 0) {
        setAllUsers(users);
      } else {
        setAllUsers([]);
      }
      //console.log("allUsers:",allUsers);
    }, []);
  
  const handleSearchUserChange = (event)=>{
      console.log(event.target);
      setSearchUserValue(event?.target?.value);
  }

  const handleCreateConversation = async ()=>{
    try {
      await createConversation({
        members:[
          ...selectedUsersForConversation,
          {
            email:loggedInUser?.user?.email,
            id:loggedInUser?.user?.id,
            imageUrl:loggedInUser?.user?.imageUrl,
            name:loggedInUser?.user?.name 
          }
        ],
        type: openNewConversationModal?.type,
        groupTitle:openNewConversationModal?.type==="GROUP"?groupTitle:null,
        isGroup:openNewConversationModal?.type==="GROUP"
      })
      handleGetConversation();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ??
          "Failed to create the conversation please try again later",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
    setOpenNewCoversationModal({isOpen:false,type:"DIRECT_MESSAGE"});
    setAnchorEl(null);
    setSelectedUsersForConversation([]);
    setGroupTitle("");
  }

  const handleGetConversation =useCallback(async (seachValue)  => {
    try {
      const response = await getConversation(seachValue);
      //console.log(response);
      if(response){
        setConversation(response??[]);
      }else{
        setConversation([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ??
          "Failed to create the conversation please try again later",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  }, []);

  const handleGoToHome = ()=>{
    if(socket && currentConversation?.id){
      socket.emit("leaveConversation",currentConversation?.id);
    }
    setCurrentConversation(null);
    navigate('/');
  }

  const handleGetMessage = useCallback(async (conversationId)=>{
    const response = await getMessage(conversationId);
    if(response){
      setAllMessages(response??[]);
    }else{
      setAllMessages([]);
    }
  },[])


  const handleDeleteConversation = async () =>{
    try {
      const response = await deleteConversation(currentConversation?.id);
      if(response){
        setChatAnchorEl(null);
        handleGoToHome();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ??
          "Failed to create the conversation please try again later",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  }

  useEffect(()=>{
    if(openNewConversationModal?.isOpen){
      if(searchUserValue){
        handleSearchUserChange(searchUserValue);
      }else{
        handleGetUsers()
      }
    }
  },[openNewConversationModal,searchUserValue,handleGetUsers])

  useEffect(()=>{
    if(loggedInUser && loggedInUser?.isAuthenticated && loggedInUser?.user?.id){
      if(searchConversationValue){
        //console.log(searchConversationValue);
        handleGetConversation(searchConversationValue);
      }else{
        handleGetConversation();
      }
    }
  },[searchConversationValue,loggedInUser,handleGetConversation])

  useEffect(()=>{
    handleGetMessage(currentConversation?.id);
  },[currentConversation,handleGetMessage]);

  useEffect(()=>{
    if(!messagesEndRef?.current || !allMessages?.length ){
      return
    }else{
      messagesEndRef?.current?.scrollIntoView({behavior:"smooth"})
    }
  },[allMessages,messagesEndRef]);

  useEffect(()=>{
    if(currentConversation?.id){
      socket?.emit("joinConversation",currentConversation?.id);
    }
  },[socket,currentConversation?.id]);

  useEffect(()=>{
    console.log(socket);
    if(socket){
      socket.on("onlineUsersNumberForGroupChats",(size)=>{
        setNumberOfOnlineUsersInCurrentConversation(size);
      });
      socket.on("newConversation",(data)=>{
        setConversation((prev)=>{return [data,...prev]})
      });
      socket.on("deleteConversation",(deletedConversationId)=>{
        setCurrentConversation(prev=>{
          if(prev?.id === deletedConversationId){
            handleGoToHome();
            return null;
          }else{
            return prev;
          }
        })
        setConversation((prev)=>{
          const filteredConversations = conversation?.filter(
            conversation=>conversation?.id!==deletedConversationId
          )
          return filteredConversations;
        });
      });
      socket.on("newMessage",(newMessage)=>{
        setAllMessages((prev)=>{
          if(prev?.find((msg)=>msg?.id===newMessage?.id)){
            return prev;
          }else{
            return [...prev,newMessage];
          }
        })
      });
      socket.on("deleteMessage",(deletedMessageId)=>{
        setAllMessages((prev)=>{
          const filteredMessages = prev?.filter((msg)=>msg?.id !== deletedMessageId);
          return filteredMessages;
        })
      });
      
      socket.on("newMessageInConversation",(newMsg)=>{
        console.log("newMessageInConversation triggered ");
        console.log(newMsg);
        setNewMessagesInConversation((prev)=>{
          const filteredMessages = prev?.filter((msg)=>msg?.conversationId!==newMsg?.conversationId);
          return [...filteredMessages,newMsg]
        });
      });

      return ()=>{
        socket.off("newConversation",()=>{
          setConversation([]);
        })
        socket.off("onlineUsersNumberForGroupChats",()=>{})
        socket.off("deleteConversation",()=>{
          setConversation([]);
        })
        socket.off("newMessage",()=>{
          setAllMessages([]);
        })
        socket.off("deletedMessage",()=>{
          setAllMessages([]);
        })
        socket.off("newMessageInConversation",()=>{setNewMessagesInConversation([]);})
      }
    }
  },[socket])

  return <conversationContext.Provider 
    value={{
      anchorEl,setAnchorEl,

      openNewConversationModal,setOpenNewCoversationModal,
      selectedUsersForConversation,setSelectedUsersForConversation,
      groupTitle,setGroupTitle,
      conversation,setConversation,
      searchConversationValue,setSearchConversationValue,
      currentConversation,setCurrentConversation,
      chatAnchorEl, setChatAnchorEl,
      numberOfOnlineUsersInCurrentConversation,setNumberOfOnlineUsersInCurrentConversation,
      newMessagesInConversation,setNewMessagesInConversation,
      handleDeleteConversation,
      handleGetUsers,
      handleSearchUserChange,
      searchUserValue,
      handleCreateConversation,
      handleGoToHome,
      allUsers,
      messagesEndRef,
      allMessages}}>
      {children}
  </conversationContext.Provider>
}

export const useConversationContext = () =>{
  return useContext(conversationContext);
}
export default ConversationContextProvider;