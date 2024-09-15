import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import ViewAttachFileMedia from './ViewAttachFileMedia'

const ViewAttachFileModal = ({open,onClose,messageBody,handleSendMessage,handleDeleteImageKitFile}) => {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogContent>
            <ViewAttachFileMedia src={messageBody?.fileUrl}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDeleteImageKitFile}>Cancel</Button>
            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ViewAttachFileModal
