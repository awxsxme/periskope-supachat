import React from 'react';
import { RefreshCw, HelpCircle, Phone, Settings, Bell, Eye, Search, MoreVertical } from 'lucide-react';
import { IconButton } from '@/components/ui/icon-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Chat, User } from '@/lib/types';

interface ChatHeaderProps {
  chat: Chat;
}

export const ChatHeader = ({ chat }: ChatHeaderProps) => {
  // Show up to 3 participant avatars
  const displayedParticipants = chat.participants?.slice(0, 3) || [];
  const remainingCount = (chat.participants?.length || 0) - 3;

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b bg-white h-16">
      <div className="flex items-center">
        <h2 className="text-base font-medium mr-2">{chat.title}</h2>
        <div className="text-xs text-gray-500 max-w-xs truncate">
          {chat.participants?.map(p => p.name).join(', ')}
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {/* Participant avatars */}
        <div className="flex -space-x-2 mr-4">
          {displayedParticipants.map((participant, index) => (
            <Avatar key={index} size="xs" className="border-2 border-white">
              <AvatarImage src={participant.avatar_url} alt={participant.name} />
              <AvatarFallback name={participant.name} />
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-xs font-medium border-2 border-white">
              +{remainingCount}
            </div>
          )}
        </div>
        
        {/* Action icons */}
        <IconButton aria-label="Refresh">
          <RefreshCw className="h-4 w-4 text-gray-600" />
        </IconButton>
        
        <IconButton aria-label="Help">
          <HelpCircle className="h-4 w-4 text-gray-600" />
        </IconButton>
        
        <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 mx-1">
          <Phone className="h-4 w-4 text-gray-600 mr-1" />
          <span className="text-xs">5 / 6 phones</span>
        </div>
        
        <IconButton aria-label="Settings">
          <Settings className="h-4 w-4 text-gray-600" />
        </IconButton>
        
        <IconButton aria-label="Notifications">
          <Bell className="h-4 w-4 text-gray-600" />
        </IconButton>
        
        <IconButton aria-label="Visibility">
          <Eye className="h-4 w-4 text-gray-600" />
        </IconButton>
        
        <IconButton aria-label="Search">
          <Search className="h-4 w-4 text-gray-600" />
        </IconButton>
        
        <IconButton aria-label="More">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </IconButton>
      </div>
    </div>
  );
};