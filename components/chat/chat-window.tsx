import React, { useEffect, useRef } from 'react';
import { DateDivider } from './date-divider';
import { MessageBubble } from './message-bubble';
import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { Chat, Message, User } from '@/lib/types';
import { groupMessagesByDate } from '@/lib/utils';

interface ChatWindowProps {
  chat: Chat | null;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

export const ChatWindow = ({ chat, messages, currentUser, onSendMessage }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={chat} />
      
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#efeae2]"
      >
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <DateDivider date={group.date} />
            
            {group.messages.map((message, messageIndex) => (
              <MessageBubble
                key={messageIndex}
                message={message}
                isSentByCurrentUser={message.sender_id === currentUser.id}
              />
            ))}
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSendMessage={onSendMessage}
        currentUser={currentUser}
      />
    </div>
  );
}