import authFetchHandler from "./authHandler"

export const deleteImageKitFile = async (fileId) =>{
    const response=await authFetchHandler({
        endPoint:"api/image-kit/delete",
        method:"DELETE",
        data:fileId
    });
    return response?.data;
}