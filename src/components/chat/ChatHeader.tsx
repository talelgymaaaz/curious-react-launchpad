import React from 'react';
import { User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  agentsOnline: boolean;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ agentsOnline, onClose }) => {
  const { t } = useTranslation(['assistant', 'chat']);
  
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-primary p-3 sm:p-4 flex items-center justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
      <div className="flex items-center gap-2 sm:gap-3 relative z-10 min-w-0 flex-1">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center ring-2 ring-white/30 flex-shrink-0">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-white font-semibold block text-sm sm:text-base truncate">
            {t('assistant:agentName')}
          </span>
          <span className="text-white/80 text-xs">
            {agentsOnline ? t('chat:onlineNow') : 'Hors ligne'}
          </span>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClose} 
        className="text-white hover:bg-white/20 h-7 w-7 sm:h-8 sm:w-8 p-0 relative z-10 flex-shrink-0"
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
};