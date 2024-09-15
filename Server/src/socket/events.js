import { joinRoom, leaveRoom } from "./room.js";
import {io} from './socket.js'
export const handleEvents = (socket) =>{
    socket.on("joinConversation",(conversationId)=>{
        //console.log("join",conversationId);
        joinRoom(socket,conversationId);
        io.to(conversationId).emit(
            "onlineUsersNumberForGroupChats",io.sockets.adapter.rooms.get(conversationId)?.size
        )
        
    })
    socket.on("leaveConversation",(conversationId)=>{
        leaveRoom(socket,conversationId);
        io.to(conversationId).emit(
            "onlineUsersNumberForGroupChats",io.sockets.adapter.rooms.get(conversationId)?.size
        )
    })
    socket.on("connectedUser",(userId)=>{
        joinRoom(socket,userId);
    })
    socket.on("disconnectedUser",(userId)=>{
        leaveRoom(socket,userId);
    })
} 