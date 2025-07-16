import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ContactForm } from './ContactForm';

interface Message {
  id_message?: number;
  text: string;
  isUser: boolean;
  imageUrl?: string;
  imageName?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

interface ChatWindowProps {
  messages: Message[];
  message: string;
  showContactForm: boolean;
  contactForm: ContactFormData;
  agentsOnline: boolean;
  onClose: () => void;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onContactFormChange: (field: keyof ContactFormData, value: string) => void;
  onContactSubmit: () => void;
  isMobile?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  message,
  showContactForm,
  contactForm,
  agentsOnline,
  onClose,
  onMessageChange,
  onSendMessage,
  onKeyDown,
  onContactFormChange,
  onContactSubmit,
  isMobile = false
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex-1 min-h-0 flex flex-col">
          <ChatMessages messages={messages} isMobile={true} />
          
          {showContactForm && (
            <ContactForm
              formData={contactForm}
              onFormChange={onContactFormChange}
              onSubmit={onContactSubmit}
            />
          )}
        </div>

        <ChatInput
          message={message}
          onMessageChange={onMessageChange}
          onSendMessage={onSendMessage}
          onKeyDown={onKeyDown}
          isMobile={true}
        />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
      <ChatHeader agentsOnline={agentsOnline} onClose={onClose} />
      
      <ChatMessages messages={messages} />
      
      {showContactForm && (
        <ContactForm
          formData={contactForm}
          onFormChange={onContactFormChange}
          onSubmit={onContactSubmit}
        />
      )}

      <ChatInput
        message={message}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};