import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatButton } from '@/components/chat/ChatButton';
import { useChat } from '@/hooks/useChat';
import { useAgentStatus } from '@/hooks/useAgentStatus';

interface FloatingAssistantProps {
  onClose?: () => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  const {
    message,
    messages,
    showContactForm,
    contactForm,
    unreadCount,
    handleMessageChange,
    handleContactFormChange,
    handleSendMessage,
    handleKeyPress,
    handleContactSubmit,
    clearUnreadCount
  } = useChat();
  
  const { agentsOnline } = useAgentStatus();

  // Initial setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Clear unread count when chat is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      clearUnreadCount();
    }
  }, [isOpen, unreadCount, clearUnreadCount]);

  if (!isVisible) return null;

  return (
    <>
      {!isMobile && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
          {isOpen ? (
            <div className="w-72 sm:w-80 max-h-[80vh]">
              <ChatWindow
                messages={messages}
                message={message}
                showContactForm={showContactForm}
                contactForm={contactForm}
                agentsOnline={agentsOnline}
                onClose={() => setIsOpen(false)}
                onMessageChange={handleMessageChange}
                onSendMessage={handleSendMessage}
                onKeyDown={handleKeyPress}
                onContactFormChange={handleContactFormChange}
                onContactSubmit={handleContactSubmit}
              />
            </div>
          ) : (
            <ChatButton
              agentsOnline={agentsOnline}
              unreadCount={unreadCount}
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      )}

      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50">
          {isOpen ? (
            <div className="w-[calc(100vw-2rem)] max-w-sm max-h-[70vh]">
              <ChatWindow
                messages={messages}
                message={message}
                showContactForm={showContactForm}
                contactForm={contactForm}
                agentsOnline={agentsOnline}
                onClose={() => setIsOpen(false)}
                onMessageChange={handleMessageChange}
                onSendMessage={handleSendMessage}
                onKeyDown={handleKeyPress}
                onContactFormChange={handleContactFormChange}
                onContactSubmit={handleContactSubmit}
              />
            </div>
          ) : (
            <ChatButton
              agentsOnline={agentsOnline}
              unreadCount={unreadCount}
              onClick={() => setIsOpen(true)}
              isMobile={true}
            />
          )}
        </div>
      )}
    </>
  );
};