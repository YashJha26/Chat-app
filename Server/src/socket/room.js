export const joinRoom = (socket,roomName)=>{
    socket.join(roomName);
};
export const leaveRoom = (socket,roomName)=>{
    socket.leave(roomName);
}