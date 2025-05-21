'use client';

import { useEffect, useState } from 'react';
import { Chat, Message, User } from '@/lib/types';
import { AppLayout } from '@/components/layout/app-layout';
import { chats as initialChats, elCentroMessages, currentUser } from '@/lib/data';
import { subscribeToMessages, sendMessage } from '@/lib/supabase';

export default function Home() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [messages, setMessages] = useState<Message[]>(elCentroMessages);
  const [activeChatId, setActiveChatId] = useState<string>('5'); // Default to Test El Centro
  
  useEffect(() => {
    // Set up subscription for real-time messages
    const subscription = subscribeToMessages(activeChatId, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [activeChatId]);
  
  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    
    // For the demo, only load the Test El Centro messages
    // In a real app, we would fetch messages for the selected chat
    if (chatId === '5') {
      setMessages(elCentroMessages);
    } else {
      // For other chats, show sample messages
      setMessages([
        {
          id: `sample-${chatId}-1`,
          chat_id: chatId,
          sender_id: currentUser.id,
          sender_name: currentUser.name,
          content: 'Hello from this chat!',
          timestamp: new Date().toISOString(),
          read: true,
          type: 'text',
        },
      ]);
    }
    
    // Mark chat as read
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, unread_count: 0 } : chat
      )
    );
  };
  
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `local-${Date.now()}`,
      chat_id: activeChatId,
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'text',
    };
    
    // Add to local messages immediately
    setMessages(prev => [...prev, newMessage]);
    
    // Update the last message in the chat
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId 
          ? { 
              ...chat, 
              last_message: content,
              last_message_time: 'Just now', 
            } 
          : chat
      )
    );
    
    // In a real app, we would send to Supabase here
    // sendMessage(activeChatId, currentUser.id, currentUser.name, content);
  };

  return (
    <AppLayout
      chats={chats}
      messages={messages}
      currentUser={currentUser}
      activeChatId={activeChatId}
      onChatSelect={handleChatSelect}
      onSendMessage={handleSendMessage}
    />
  );
}