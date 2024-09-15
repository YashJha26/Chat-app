import React, { useEffect } from 'react'
import ChatListItem from './ChatListItem'
import NoDataAvailable from '../../shared/NoDataAvailable';
import { useConversationContext } from '../../src/contexts/ConversationContext';

const ChatList = ({conversation}) => {
  //console.log(conversation);
  const {currentConversation,newMessagesInConversation} = useConversationContext();
  useEffect(() => {
    console.log("Conversation has changed", conversation);
  }, [conversation]);
  //console.log("newMessagesInConversation",newMessagesInConversation);
  if(conversation && Array.isArray(conversation) && conversation.length>0){
    return (conversation.map((conv)=>{
      return <ChatListItem 
        key={conv.id} 
        conversation={conv}
        currentConversation={currentConversation} 
        newMessagesInConversation={newMessagesInConversation}
      />}
    ));
  }else{
    return <NoDataAvailable message="No chats found"/>
  }
}

export default ChatList
