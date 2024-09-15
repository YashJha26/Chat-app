import { Typography, useMediaQuery } from '@mui/material';
import { IKImage, IKVideo } from 'imagekitio-react';
import React from 'react'


export const checkIfUrlIsVideo = (url) => {
    const videoFormats = ["mp4", "mov", "avi", "mkv", "wmv", "flv", "webm"];
    const splitUrl = url?.split(".")?.pop();
    return videoFormats?.includes(splitUrl);
};
export const checkIfUrlIsImage = (url) => {
    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const splitUrl = url?.split(".")?.pop();
    return imageFormats?.includes(splitUrl );
};

const ViewAttachFileMedia = ({src}) => {
  const isTablet= useMediaQuery("max-width:768px");
  const isVideo=checkIfUrlIsVideo(src);
  const isImage=checkIfUrlIsImage(src);
  if(isVideo && src?.split("/")?.pop()){
    return (
        <IKVideo
          path={src?.split("/")?.pop()}
          controls={true}
          width={isTablet?"200":"400"}
        />
      );
  }
  if (isImage) {
    return <IKImage src={src}  width={isTablet?"200":"400"} />;
  }
  return (
    <Typography variant="h6" fontWeight="bold">
      File Format is not supported
    </Typography>
  );
}

export default ViewAttachFileMedia
