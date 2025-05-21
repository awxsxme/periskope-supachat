import { useState } from 'react';
import { Search, Filter, Save, Check } from 'lucide-react';
import { ChatListItem } from './chat-list-item';
import { SidebarNav } from './sidebar-nav';
import { Chat } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string;
  onChatSelect: (chatId: string) => void;
}

export const ChatSidebar = ({ chats, activeChatId, onChatSelect }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r bg-white">
      {/* App logo */}
      <div className="flex items-center px-4 h-16 border-b">
        <div className="bg-green-100 w-8 h-8 rounded-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0C964A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <h1 className="ml-3 text-lg font-medium text-gray-800">Chats</h1>
      </div>

      {/* Filter bar */}
      <div className="px-3 py-2 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-green-600 font-medium gap-1 text-sm">
            <Filter className="h-4 w-4" />
            <span>Custom Filter</span>
          </div>
          <button className="text-sm font-medium text-green-600">Save</button>
        </div>
        
        <div className="relative mb-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:border-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Badge variant="filter" className="flex items-center gap-1">
          <span>Filtered</span>
          <Check className="h-3 w-3" />
        </Badge>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={() => onChatSelect(chat.id)}
          />
        ))}
      </div>

      {/* Sidebar navigation */}
      <SidebarNav />
    </div>
  );
};