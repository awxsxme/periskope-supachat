import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/lib/types';
import { formatMessageTime } from '@/lib/utils';
import { Check } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isSentByCurrentUser: boolean;
}

export const MessageBubble = ({ message, isSentByCurrentUser }: MessageBubbleProps) => {
  return (
    <div className={`flex items-end mb-3 ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isSentByCurrentUser && (
        <Avatar size="xs" className="mr-2 mb-2">
          <AvatarImage src={`/avatars/${message.sender_id}.png`} alt={message.sender_name} />
          <AvatarFallback name={message.sender_name} />
        </Avatar>
      )}
      
      <div 
        className={`max-w-[75%] ${
          isSentByCurrentUser 
            ? 'bg-green-100 rounded-l-lg rounded-tr-lg' 
            : 'bg-white rounded-r-lg rounded-tl-lg'
        } px-3 py-2 shadow-sm`}
      >
        {!isSentByCurrentUser && (
          <div className="text-sm font-medium text-green-700 mb-1">
            {message.sender_name}
          </div>
        )}
        
        <div className="text-sm text-gray-800">
          {message.content}
        </div>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs text-gray-500">
            {formatMessageTime(message.timestamp)}
          </span>
          
          {isSentByCurrentUser && (
            <div className="flex">
              <Check className="h-3 w-3 text-gray-500" />
              <Check className="h-3 w-3 text-gray-500 -ml-0.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};