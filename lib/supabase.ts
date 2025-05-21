import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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