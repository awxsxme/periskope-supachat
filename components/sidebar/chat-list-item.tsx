import React from 'react';
import { Chat } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem = ({ chat, isActive, onClick }: ChatListItemProps) => {
  // Convert label strings to badge variants
  const getLabelVariant = (label: string) => {
    const lowercase = label.toLowerCase();
    if (lowercase === 'internal') return 'internal';
    if (lowercase === 'signup') return 'signup';
    if (lowercase === 'content') return 'content';
    if (lowercase === 'dont send') return 'dontsend';
    return 'demo';
  };

  return (
    <div 
      className={`flex items-start px-3 py-3 cursor-pointer gap-3 hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-100' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <Avatar size="sm">
          <AvatarImage 
            src={chat.participants && chat.participants[0]?.avatar_url || '/avatars/default.png'} 
            alt={chat.title} 
          />
          <AvatarFallback name={chat.title} />
        </Avatar>
        {chat.muted && (
          <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3l18 18" />
              <path d="M9.6 5a9 9 0 0 1 13.4 13.4" />
              <path d="M5 9.6A9 9 0 0 0 17.5 20" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium text-sm text-gray-900 truncate">{chat.title}</h3>
          <span className="text-xs text-gray-500">{chat.last_message_time}</span>
        </div>
        
        <p className="text-xs text-gray-600 truncate mt-0.5 flex items-center gap-1">
          {chat.last_message}
        </p>
        
        <div className="flex items-center gap-1 mt-1 flex-wrap">
          {chat.labels?.map((label, index) => (
            <Badge 
              key={index}
              variant={getLabelVariant(label)}
              size="sm"
              className="text-xs px-1.5 py-0.5"
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1">
        {chat.unread_count ? (
          <Badge variant="unread">
            {chat.unread_count}
          </Badge>
        ) : (
          <Check className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};