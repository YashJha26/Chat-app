import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useAuthContext } from './AuthContext';
import {io} from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const SocketContext = createContext(null);
const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [cookies] = useCookies(["token"]);
    const {loggedInUser} = useAuthContext();
    const memorizedCookies = useMemo(()=>{return cookies},[cookies]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(memorizedCookies && memorizedCookies?.token){
            try {
                const socketInstance = io("http://localhost:8000", {
                    auth: { token: memorizedCookies?.token },
                });
                if(socketInstance){
                    setSocket(socketInstance);
                }
            } catch (error) {
                navigate('/auth');
                console.log(error);
            }
        }
    },[memorizedCookies,navigate]);

    useEffect(()=>{
        if(socket && loggedInUser && loggedInUser?.isAuthenticated && loggedInUser?.user){
            socket.on('connect',()=>{
                socket.emit('connectedUser',loggedInUser?.user?.id);
            });
            socket.on('disconnect',()=>{
                socket.emit('disconnectedUser',loggedInUser?.user?.id);
            });
            return ()=>{
                socket.off("connect",()=>{});
                socket.off("disconnect",()=>{});
            }
        }
    },[])
    return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
export const useSocketContext =  () =>{
    return useContext(SocketContext);
}  