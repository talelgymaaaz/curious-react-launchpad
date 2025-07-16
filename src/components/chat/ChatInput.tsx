import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface ChatInputProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
  onKeyDown,
  disabled = false
}) => {
  const { t } = useTranslation('chat');
  
  return (
    <div className="p-3 sm:p-4 border-t border-border bg-card">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('typeMessage')}
            className="h-10 sm:h-12 px-3 sm:px-4 py-2 sm:py-3 rounded-full text-xs sm:text-sm transition-all duration-200 border-border/50 focus:border-primary"
            autoComplete="off"
            disabled={disabled}
          />
        </div>
        
        <button
          type="button"
          onClick={onSendMessage}
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg disabled:shadow-none disabled:hover:scale-100"
        >
          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};