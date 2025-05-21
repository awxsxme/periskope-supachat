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
    <div 
      className={`flex items-end gap-1 ${
        isSentByCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isSentByCurrentUser && (
        <Avatar size="xs" className="mb-1 flex-shrink-0">
          <AvatarImage src={`/avatars/${message.sender_id}.png`} alt={message.sender_name} />
          <AvatarFallback name={message.sender_name} />
        </Avatar>
      )}
      
      <div 
        className={`relative max-w-[65%] ${
          isSentByCurrentUser 
            ? 'bg-[#e7ffdb] rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
            : 'bg-white rounded-tr-lg rounded-tl-lg rounded-br-lg'
        } px-2 py-1.5 shadow-sm`}
      >
        {!isSentByCurrentUser && (
          <div className="text-xs font-medium text-[#1ea959] mb-0.5">
            {message.sender_name}
          </div>
        )}
        
        <div className="text-sm text-gray-800 break-words">
          {message.content}
        </div>
        
        <div className="flex items-center justify-end gap-0.5 mt-0.5 min-w-[65px]">
          <span className="text-[11px] text-gray-500">
            {formatMessageTime(message.timestamp)}
          </span>
          
          {isSentByCurrentUser && (
            <div className="flex ml-0.5">
              <Check className="h-3 w-3 text-[#53bdeb]" />
              <Check className="h-3 w-3 text-[#53bdeb] -ml-[5px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}