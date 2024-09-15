import authFetchHandler from "./authHandler";
import react, { useEffect, useState } from "react";
import { useConversationContext } from "../contexts/ConversationContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useImageKitContext } from "../contexts/ImageKitContext";
import { deleteImageKitFile } from "./imageKitApiHandler";
export const sendMessage = async ({
    conversationId,
    messageBody,
    senderId,
  }) => {
    const response = await authFetchHandler({
      endPoint: "api/message/create",
      method: "POST",
      data: { conversationId, senderId, messageBody },
    });
    
    return response?.data ?? [];
};

export const getMessage = async (conversationId)=>{
  const response = await authFetchHandler({
    endPoint:"api/message/",
    method:"POST",
    data:{conversationId},
  });
  return response?.data ?? [];
}

export const deleteMessage = async ({message})=>{
  const response = await authFetchHandler({
    endPoint:"api/message/delete",
    method:"DELETE",
    data:{message}
  })
  return response?.data;
}

export const useMessage = () =>{
  const {ikUploadRef,fileUrl,fileId,uploadImgLoading,setFileUrl,setFileId} = useImageKitContext();
  const {currentConversation} = useConversationContext();
  const {loggedInUser} = useAuthContext();
  const [messageCardAnchorEl,setMessageCardAnchorEl]=useState(null);
  const [messageBody,setMessageBody] = useState({
      body:"",
      fileId:null,
      fileUrl:null
  });
  const [openAttachedModal,setOpenAttachedModal]= useState(false);
  const handleReset= ()=>{
      setMessageBody({ fileId: null, fileUrl: null, body: "" });
      setFileId(null);
      setFileUrl(null);
  }
  function handleCloseAttachedFilesModal() {
    handleReset();
    setOpenAttachedModal(false);
    ikUploadRef.current.value = "";
  }
  const handleSendMessage = async()=>{
      //console.log("loggedInUser" ,loggedInUser?.user);
      //console.log("members",currentConversation?.members);
      const senderMember=currentConversation?.members?.find(
          (member) => member?.userId === loggedInUser?.user?.id
        );
      const senderId=senderMember?.id;
      //console.log("member Found",senderMember);
      await sendMessage({conversationId:currentConversation?.id , messageBody,senderId:senderId});
      handleCloseAttachedFilesModal();
  }
  const handleDeleteMessage = async(message) =>{
    //console.log("clicked");
    setMessageCardAnchorEl(null);
    await deleteMessage({message });
  }
  const handleDeleteImageKitFile = async (fileId)=>{
    await deleteImageKitFile(fileId);
    handleReset();
    setOpenAttachedModal(false);
    ikUploadRef.current.value="";
  }
  useEffect(()=>{
    if(fileId && fileUrl){
      setMessageBody({body:"",fileId,fileUrl});
      setOpenAttachedModal(true);
    }
  },[fileId,fileUrl])
  return {
    messageBody,
    setMessageBody,
    handleSendMessage,
    handleDeleteMessage,
    messageCardAnchorEl,
    setMessageCardAnchorEl,
    ikUploadRef,
    uploadImgLoading,
    openAttachedModal,
    handleCloseAttachedFilesModal,
    handleDeleteImageKitFile,
    fileUrl,
    fileId,
  };
}
  