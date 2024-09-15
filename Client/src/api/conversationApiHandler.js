import authFetchHandler from "./authHandler";

export const createConversation = async (data) => {
    console.log(data);
    const response = await authFetchHandler({
      endPoint: "api/conversation/create",
      method: "POST",
      data,
    });
    return response?.data;
  }
  
  export const getConversation = async (searchValue) => {
    //console.log("getConv:",searchValue);
    const response = await authFetchHandler({
      endPoint: "api/conversation/",
      method: "POST",
      data:{searchValue},
    });
    return response?.data;
  }

  export const deleteConversation = async (conversationId)=>{
    const response = await authFetchHandler({
      endPoint:"api/conversation/delete",
      method:"DELETE",
      data:{conversationId}
    })
    return response?.data;
  }
  