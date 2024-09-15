import { createContext, useContext, useRef, useState } from "react";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import {IKUpload} from 'imagekitio-react';
import toast from "react-hot-toast";
export const ImageKitContext = createContext({
  ikUploadRef: null,
  uploadImgLoading: false,
  setUploadImgLoading: () => {},
  fileUrl: null,
  setFileUrl: () => {},
  fileId: null,
  setFileId: () => {},
});

const ImageKitContextProvider = ({children})=>{
    const ikUploadRef  = useRef(null);
    const [uploadImgLoading,setUploadImgLoading]=useState(false);
    const [fileUrl,setFileUrl]=useState(null);
    const [fileId,setFileId]=useState(null);
    return (
        <ImageKitContext.Provider 
            value={{uploadImgLoading,setUploadImgLoading,ikUploadRef,fileId,fileUrl,setFileId,setFileUrl}}
        >
            {children}
            <IKUpload
                ref={ikUploadRef}
                style={{ display: 'none' }}
                onSuccess={(data) => {
                setFileUrl(data?.url);
                setFileId(data?.fileId);
                setUploadImgLoading(false);
                }}
                onUploadStart={() => {
                setUploadImgLoading(true);
                }}
                onError={(error) => {
                console.log(error);
                toast.error(
                    error?.toString() ?? 'Failed to upload the media. Please try again',
                    {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                    }
                );
                setUploadImgLoading(false);
                }}
            />
            {uploadImgLoading && (
                <Dialog open={uploadImgLoading}>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </ImageKitContext.Provider>
    )
}

export const useImageKitContext = () => {
    return useContext(ImageKitContext);
};

export default ImageKitContextProvider;