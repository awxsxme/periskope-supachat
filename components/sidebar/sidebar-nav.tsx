import React from 'react';
import { MessageCircle, Tag, Settings, Users, BarChart2 } from 'lucide-react';
import { IconButton } from '@/components/ui/icon-button';

export const SidebarNav = () => {
  return (
    <div className="flex flex-col items-center border-t py-4 gap-4 bg-white">
      <IconButton 
        isActive={true}
        aria-label="Chats"
      >
        <MessageCircle className="h-5 w-5 text-green-600" />
      </IconButton>
      
      <IconButton
        aria-label="Labels"
      >
        <Tag className="h-5 w-5 text-gray-600" />
      </IconButton>
      
      <IconButton
        aria-label="Users"
      >
        <Users className="h-5 w-5 text-gray-600" />
      </IconButton>
      
      <IconButton
        aria-label="Analytics"
      >
        <BarChart2 className="h-5 w-5 text-gray-600" />
      </IconButton>
      
      <IconButton
        aria-label="Settings"
      >
        <Settings className="h-5 w-5 text-gray-600" />
      </IconButton>
    </div>
  );
};