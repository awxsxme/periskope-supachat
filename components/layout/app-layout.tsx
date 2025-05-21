import React from 'react';
import { ChatSidebar } from '@/components/sidebar/chat-sidebar';
import { ChatWindow } from '@/components/chat/chat-window';
import { Chat, Message, User } from '@/lib/types';

interface AppLayoutProps {
  chats: Chat[];
  messages: Message[];
  currentUser: User;
  activeChatId: string;
  onChatSelect: (chatId: string) => void;
  onSendMessage: (content: string) => void;
}

export const AppLayout = ({ 
  chats, 
  messages, 
  currentUser, 
  activeChatId, 
  onChatSelect,
  onSendMessage
}: AppLayoutProps) => {
  const activeChat = chats.find(chat => chat.id === activeChatId) || null;
  
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 h-full overflow-hidden">
        <ChatSidebar 
          chats={chats} 
          activeChatId={activeChatId}
          onChatSelect={onChatSelect}
        />
      </div>
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatWindow 
          chat={activeChat}
          messages={messages}
          currentUser={currentUser}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};