import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  agentsOnline: boolean;
  unreadCount: number;
  onClick: () => void;
  isMobile?: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ 
  agentsOnline, 
  unreadCount, 
  onClick, 
  isMobile = false 
}) => {
  return (
    <Button 
      onClick={onClick} 
      size="lg" 
      className={cn(
        "rounded-full  bg-gradient-to-r from-primary via-accent to-primary shadow-xl ring-4 ring-primary/20",
        isMobile ? "w-14 h-14" : "w-16 h-16"
      )}
    >
      <div className="relative">
        <User className={cn("text-white", isMobile ? "w-5 h-5" : "w-6 h-6")} />
        
        {/* Online status indicator - positioned at top-right edge */}
        <div className={cn(
          "absolute rounded-full border-2 border-white shadow-lg",
          isMobile ? "w-3 h-3" : "w-4 h-4",
          agentsOnline ? "bg-green-400 animate-pulse" : "bg-red-400"
        )} style={{
          top: '-15%',
          right: '-15%'
        }}></div>
        
        {/* Unread message badge - positioned at top-left for better visibility */}
        {unreadCount > 0 && (
          <div className={cn(
            "absolute bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border-white animate-pulse z-10",
            isMobile 
              ? "-top-2 -left-2 w-5 h-5 border-2" 
              : "-top-3 -left-3 w-6 h-6 border-2"
          )}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>
    </Button>
  );
};