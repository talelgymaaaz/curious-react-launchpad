
-- Add image support to chat_messages table
ALTER TABLE chat_messages 
ADD COLUMN image_url VARCHAR(500) NULL,
ADD COLUMN image_name VARCHAR(255) NULL,
ADD COLUMN image_size INT NULL;

-- Add index for performance
CREATE INDEX idx_chat_messages_image ON chat_messages(image_url) WHERE image_url IS NOT NULL;
