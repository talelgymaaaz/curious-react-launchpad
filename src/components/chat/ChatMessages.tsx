import React, { useEffect, useRef } from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Message {
  id_message?: number;
  text: string;
  isUser: boolean;
  imageUrl?: string;
  imageName?: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const { t } = useTranslation('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-48 sm:h-64 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-background to-muted/30">
      {messages.length === 0 && (
        <div className="flex gap-2 sm:gap-3 items-start animate-fade-in">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 bg-gradient-to-br from-accent via-primary to-accent text-white border-white/30">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="max-w-[75%] sm:max-w-[70%] rounded-2xl text-xs sm:text-sm shadow-lg border backdrop-blur-sm bg-white/95 text-foreground border-border/50 rounded-tl-md">
            <div className="p-3 sm:p-4 leading-relaxed text-xs sm:text-sm">Besoin d'aide ? Je suis là !</div>
          </div>
        </div>
      )}
      {messages.map((msg, index) => (
        <div key={msg.id_message || index} className={cn("flex gap-2 sm:gap-3 items-start animate-fade-in", msg.isUser ? "flex-row-reverse" : "flex-row")}>
          <div className={cn(
            "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2", 
            msg.isUser 
              ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary/20" 
              : "bg-gradient-to-br from-accent via-primary to-accent text-white border-white/30"
          )}>
            {msg.isUser ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
          <div className={cn(
            "max-w-[75%] sm:max-w-[70%] rounded-2xl text-xs sm:text-sm shadow-lg border backdrop-blur-sm", 
            msg.isUser 
              ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-md border-primary/30" 
              : "bg-white/95 text-foreground border-border/50 rounded-tl-md"
          )}>
            {msg.imageUrl ? (
              <div className="p-2 sm:p-3">
                <img 
                  src={msg.imageUrl} 
                  alt={msg.imageName || t('imageShared')} 
                  className="max-w-full max-h-32 sm:max-h-48 rounded-xl object-cover cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-md"
                  onClick={() => window.open(msg.imageUrl, '_blank')}
                  loading="lazy"
                />
                {msg.text && <p className="mt-2 sm:mt-3 leading-relaxed text-xs sm:text-sm">{msg.text}</p>}
              </div>
            ) : (
              <div className="p-3 sm:p-4 leading-relaxed text-xs sm:text-sm">{msg.text}</div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};