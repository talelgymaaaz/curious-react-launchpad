import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatButton } from '@/components/chat/ChatButton';
import { useChat } from '@/hooks/useChat';
import { useAgentStatus } from '@/hooks/useAgentStatus';
import { X } from 'lucide-react';

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
        <>
          {/* Mobile Chat Button */}
          {!isOpen && (
            <div className="fixed bottom-4 right-4 z-50">
              <ChatButton
                agentsOnline={agentsOnline}
                unreadCount={unreadCount}
                onClick={() => setIsOpen(true)}
                isMobile={true}
              />
            </div>
          )}
          
          {/* Mobile Full-Screen Chat Modal */}
          {isOpen && (
            <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent via-primary to-accent text-white flex items-center justify-center">
                      <span className="text-sm font-medium">L</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Luxury Assistant</h3>
                      <p className="text-xs text-muted-foreground">
                        {agentsOnline ? 'En ligne' : 'Hors ligne'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Mobile Chat Content */}
                <div className="flex-1 min-h-0">
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
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};