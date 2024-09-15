import authFetchHandler from "./authHandler"

export const getAllUsers = async (searchUserValue)=>{
    const response = await authFetchHandler({endPoint:"api/users/all",method:"GET",data:{searchUserValue}});
    return response.data;
}