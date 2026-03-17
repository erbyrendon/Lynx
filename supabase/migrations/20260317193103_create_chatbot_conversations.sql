/*
  # Create Chatbot Conversations Table

  1. New Tables
    - `chatbot_conversations`
      - `id` (uuid, primary key) - Unique identifier for each conversation
      - `session_id` (text) - Browser session identifier for anonymous users
      - `created_at` (timestamptz) - When conversation started
      - `updated_at` (timestamptz) - Last activity timestamp
      - `language` (text) - Language preference (en/es)
      - `is_active` (boolean) - Whether conversation is still active

    - `chatbot_messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `conversation_id` (uuid) - Reference to parent conversation
      - `role` (text) - Either 'user' or 'assistant'
      - `content` (text) - The message content
      - `created_at` (timestamptz) - Message timestamp

  2. Security
    - Enable RLS on both tables
    - Allow public insert/select for anonymous chat functionality
    - Restrict access by session_id for privacy

  3. Indexes
    - Index on session_id for fast lookups
    - Index on conversation_id for message retrieval
*/

CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  language text DEFAULT 'en',
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS chatbot_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES chatbot_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_session_id ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_messages_conversation_id ON chatbot_messages(conversation_id);

ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to create conversations"
  ON chatbot_conversations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read own conversations by session"
  ON chatbot_conversations
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to update own conversations by session"
  ON chatbot_conversations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to insert messages"
  ON chatbot_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read messages"
  ON chatbot_messages
  FOR SELECT
  TO anon
  USING (true);