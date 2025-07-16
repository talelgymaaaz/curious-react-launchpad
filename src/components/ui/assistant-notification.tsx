import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
interface AssistantNotificationProps {
  onClose: () => void;
}
export const AssistantNotification: React.FC<AssistantNotificationProps> = ({
  onClose
}) => {
  const [showAgent, setShowAgent] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const {
    t
  } = useTranslation();

  // Sound effect function
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Cool notification sound - ascending notes
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  }, []);
  useEffect(() => {
    // Show welcome message on home page load
    if (location.pathname === '/') {
      setMessage(t('assistant:welcome'));

      // Step 1: Show agent circle first
      setTimeout(() => {
        setShowAgent(true);
      }, 2000);

      // Step 2: Play sound and show bubble from circle
      setTimeout(() => {
        playNotificationSound();
        setShowBubble(true);
      }, 2800);

      // Auto-hide after 6 seconds from bubble appearance
      setTimeout(() => {
        handleClose();
      }, 6800);
    }

    // Show product help message on product pages
    if (location.pathname.startsWith('/product/')) {
      setMessage(t('assistant:productHelp'));
      setTimeout(() => {
        setShowAgent(true);
      }, 1000);
      setTimeout(() => {
        playNotificationSound();
        setShowBubble(true);
      }, 1800);
      setTimeout(() => {
        handleClose();
      }, 6800);
    }
  }, [location.pathname, t, playNotificationSound]);
  const handleClose = () => {
    setShowBubble(false);
    setTimeout(() => {
      setShowAgent(false);
    }, 300);
    setTimeout(() => {
      onClose();
    }, 600);
  };
  if (!showAgent && !showBubble) return null;
  return <div className="fixed bottom-6 right-6 z-[60]">
      <div className="relative">
        {/* Agent Circle - appears first */}
        {showAgent && <div className="fixed bottom-6 right-6 z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center shadow-2xl ring-4 ring-primary/20 animate-scale-in">
              <User className="w-7 h-7 text-white" />
              {/* Online indicator - always perfectly positioned */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>}

        {/* Speech Bubble - appears from the circle */}
        {showBubble && <div className="fixed bottom-10 right-24 z-20 animate-[scale-in_0.3s_ease-out,fade-in_0.3s_ease-out]">
            <div className="bg-white rounded-2xl shadow-2xl border border-border/20 p-5 max-w-[320px] w-max relative backdrop-blur-sm">
              {/* Agent info and message */}
              <div className="space-y-3">
                
                <p className="text-base text-foreground font-medium leading-relaxed pl-1">{message}</p>
              </div>
              
              {/* Bubble tail pointing to the agent circle */}
              <div className="absolute right-[-12px] bottom-8">
                <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent drop-shadow-lg"></div>
                <div className="absolute top-0 right-[1px] w-0 h-0 border-l-[16px] border-l-border/20 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
              </div>
              
              {/* Close button */}
              <button onClick={handleClose} className="absolute top-2 right-2 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center rounded-full hover:bg-muted">
                ×
              </button>
            </div>
          </div>}
      </div>
    </div>;
};