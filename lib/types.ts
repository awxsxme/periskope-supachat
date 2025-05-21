export type User = {
  id: string;
  name: string;
  avatar_url?: string;
  phone?: string;
};

export type Chat = {
  id: string;
  title: string;
  last_message?: string;
  last_message_time?: string;
  unread_count?: number;
  labels?: string[];
  participants?: User[];
  muted?: boolean;
};

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file' | 'audio';
};