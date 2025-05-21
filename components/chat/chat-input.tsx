import React, { useState } from 'react';
import { Smile, Paperclip, Bell, Zap, Camera, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconButton } from '@/components/ui/icon-button';
import { User } from '@/lib/types';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  currentUser: User;
}

export const ChatInput = ({ onSendMessage, currentUser }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('whatsapp');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center border-b">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="whatsapp" 
              className={`py-2 px-4 rounded-none ${
                activeTab === 'whatsapp' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500'
              }`}
            >
              WhatsApp
            </TabsTrigger>
            <TabsTrigger 
              value="private" 
              className={`py-2 px-4 rounded-none ${
                activeTab === 'private' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500'
              }`}
            >
              Private Note
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      
      <div className="p-3">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              className="w-full resize-none border rounded-md px-3 py-2 max-h-24 min-h-10 focus:outline-none focus:border-green-500"
              rows={1}
            />
          </div>
          
          <div className="ml-3">
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <IconButton aria-label="Emoji">
              <Smile className="h-5 w-5 text-gray-500" />
            </IconButton>
            
            <IconButton aria-label="Attachment">
              <Paperclip className="h-5 w-5 text-gray-500" />
            </IconButton>
            
            <IconButton aria-label="Notify">
              <Bell className="h-5 w-5 text-gray-500" />
            </IconButton>
            
            <IconButton aria-label="Action">
              <Zap className="h-5 w-5 text-gray-500" />
            </IconButton>
            
            <IconButton aria-label="Camera">
              <Camera className="h-5 w-5 text-gray-500" />
            </IconButton>
            
            <IconButton aria-label="More">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </IconButton>
          </div>
          
          <div className="flex items-center text-sm font-medium text-green-600">
            <span>{currentUser.name}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};