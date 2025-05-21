/*
  # Initial Schema Setup for Chat Application

  1. New Tables
    - `users` - Extended user profiles
    - `chats` - Chat conversations
    - `chat_participants` - Many-to-many relationship between users and chats
    - `messages` - Chat messages

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  last_message TEXT,
  muted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create chat participants table
CREATE TABLE IF NOT EXISTS chat_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(chat_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text' NOT NULL,
  read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create chat labels table
CREATE TABLE IF NOT EXISTS chat_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(chat_id, label)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_labels ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can see chats they're a participant in
CREATE POLICY "Users can view their chats"
  ON chats
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_id = chats.id AND user_id = auth.uid()
    )
  );

-- Users can see chat participants for their chats
CREATE POLICY "Users can view chat participants for their chats"
  ON chat_participants
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_id = chat_participants.chat_id AND user_id = auth.uid()
    )
  );

-- Users can only see messages for chats they're a participant in
CREATE POLICY "Users can view messages for their chats"
  ON messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_id = messages.chat_id AND user_id = auth.uid()
    )
  );

-- Users can only insert messages for chats they're a participant in
CREATE POLICY "Users can send messages to their chats"
  ON messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_id = messages.chat_id AND user_id = auth.uid()
    ) AND auth.uid() = sender_id
  );

-- Users can see labels for their chats
CREATE POLICY "Users can view labels for their chats"
  ON chat_labels
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_id = chat_labels.chat_id AND user_id = auth.uid()
    )
  );

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;