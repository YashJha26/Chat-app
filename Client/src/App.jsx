import { useContext, useState } from 'react'
import { ThemeContext } from '@emotion/react'
import { useThemeContext } from './contexts/ThemeContextProvider'
import ChatDrawer from '../shared/ChatDrawer';
import Auth from '../components/auth/Auth';
import {Route, BrowserRouter as Router, Routes} from'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import ConversationContextProvider from './contexts/ConversationContext';
import { Toaster } from 'react-hot-toast'
import SocketContextProvider from './contexts/SocketContextProvider';
import { IKContext } from 'imagekitio-react';
import ImageKitContextProvider from './contexts/ImageKitContext';
import axios from 'axios';
import { CssBaseline } from '@mui/material';
function App() {
  const [count, setCount] = useState(0)
  const {mode,handleSetTheme }= useThemeContext();

  const authenticator = async (callback) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/img-kit/auth`);
      if(response?.status!==200){
        throw new Error(`Request failed with status ${response.status}`);
      }
      const {signature,expire,token}=response?.data ;
      return {signature,expire,token}
    } catch (error) {
      throw new Error(`Authentication request faliled: `);
    }
  };

  return (
    <Router>
      <IKContext 
        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}
        publicKey={import.meta.env.VITE_IMAGE_KIT_PUBLICKEY}
        authenticator={authenticator}

      >
        <ImageKitContextProvider>
          <AuthContextProvider>
            <SocketContextProvider>
              <ConversationContextProvider>
                <CssBaseline/>
                <Routes>
                  <Route path='/' element={<ChatDrawer/>}/>
                  <Route path='/auth' element={<Auth/>} />
                  <Route path="/chat/:chatId" element={<ChatDrawer/>} />
                </Routes>
                <Toaster position='top-right' reverseOrder={false}/>   
              </ConversationContextProvider>
            </SocketContextProvider>
          </AuthContextProvider>   
        </ImageKitContextProvider>
      </IKContext>
    </Router>
    
  )
}

export default App
