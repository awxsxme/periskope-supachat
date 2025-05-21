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
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  const handleSendMessage = (content: string) => {
    onSendMessage(content);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={chat} />
      
      <div 
        className="flex-1 overflow-y-auto p-4"
        style={{
          backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAB3UlEQVR4nO3dMU7DMBiG4a9/KSConEFIXIBzcAJWJFbEFGCFI3AGRiQWdg7CAMrAgFiQuqhVm9RJ/MT5HqmLFSmxX4aodVsIAAAAAAAAAAAAAAB0xmJ8sNlsZovFYi3pQdJK0p2kq/Htv5I+JL1KepO0l/S+3W6PU2UeIu8mvzccDte73e5J0pOk64br/Eh6kfRcVdV+qEGTFyLvU94bjsM/qy6ej9N5Y10hAAAAAAAAAAAAgJ6KiHhJo6Oj5L3Dbre7nDoTLaTIDOQ9SiHyfjtRCvkfNJUCAAAAAAAAAACA3smiiYjRvJLK5L2lFJlL5L21FAAAAAAAAAAAAADQnmyaiPtKA/JuSzZNxJypAdm0JZsmjpkaZNNUNm3IqAYZtSWjGmTUlowqyKgGGbVFRjXIqC0ZVZBRDTJqK6uMiIi191eJiPgbHGjIm3dLLSJ+JV1OHZ8bRT+XHUtqypvYkzf5lnLezFvKefNuKeXNu6WcN++Wct68W+p58+bdkAAAAAAAAAAAAAAAksmmiah5aJxNEzVTIJsm4oFxLcioRpYPjMfGzzTPp5gTqrSZN/mWct7MW8p5824p5c27pZw375Zy3rxb6nnzbtAEAAAAAAAAAAAAAGDOfgGcO6Y5UoZXpAAAAABJRU5ErkJggg==')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
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
        onSendMessage={handleSendMessage}
        currentUser={currentUser}
      />
    </div>
  );
};