import { createBrowserClient } from '@supabase/ssr';
import { Database } from './database.types';

export const createClient = () => {
  return createBrowserClient<Database>(
    "https://rkhpgjrizrvuwsfcgopm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJraHBnanJpenJ2dXdzZmNnb3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDM1ODgsImV4cCI6MjA2MzM3OTU4OH0.f6JFWKfuoUMZqz6NLYtWvhYKxZJHAqFdy29Evi1i81s"
  );
};

// Create a singleton instance
export const supabase = createClient();

export async function fetchChats() {
  const { data, error } = await supabase
    .from('chats')
    .select(`
      *,
      chat_participants(user_id),
      messages(id, content, created_at, sender_id)
    `)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching chats:', error);
    return [];
  }

  return data || [];
}

export async function fetchMessages(chatId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
}

export async function sendMessage(chatId: string, senderId: string, senderName: string, content: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        chat_id: chatId,
        sender_id: senderId,
        sender_name: senderName,
        content,
        read: false,
      },
    ])
    .select();

  if (error) {
    console.error('Error sending message:', error);
    return null;
  }

  // Update the last message in the chat
  await supabase
    .from('chats')
    .update({
      last_message: content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', chatId);

  return data?.[0] || null;
}

export function subscribeToMessages(chatId: string, callback: (message: any) => void) {
  return supabase
    .channel(`messages:${chatId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chatId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
}