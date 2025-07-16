import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Message {
  id_message?: number;
  text: string;
  isUser: boolean;
  imageUrl?: string;
  imageName?: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
}

export const useChat = () => {
  const { t } = useTranslation(['chat', 'assistant']);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: t('assistant:welcome'), isUser: false }
  ]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: ''
  });
  const [sessionId, setSessionId] = useState<string>('');
  const [userInfoCollected, setUserInfoCollected] = useState(false);
  const [isPollingMessages, setIsPollingMessages] = useState(false);
  const [tempSessionId, setTempSessionId] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadMessageId, setLastReadMessageId] = useState<number>(0);
  const messagePollingRef = useRef<NodeJS.Timeout | null>(null);
  
  // localStorage keys
  const STORAGE_KEYS = {
    SESSION_ID: 'chat_session_id',
    MESSAGES: 'chat_messages',
    CONTACT_FORM: 'chat_contact_form',
    USER_INFO_COLLECTED: 'chat_user_info_collected',
    UNREAD_COUNT: 'chat_unread_count',
    LAST_READ_MESSAGE_ID: 'chat_last_read_message_id'
  };

  // Load chat state from localStorage
  useEffect(() => {
    try {
      const savedSessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      const savedContactForm = localStorage.getItem(STORAGE_KEYS.CONTACT_FORM);
      const savedUserInfoCollected = localStorage.getItem(STORAGE_KEYS.USER_INFO_COLLECTED);
      const savedUnreadCount = localStorage.getItem(STORAGE_KEYS.UNREAD_COUNT);
      const savedLastReadMessageId = localStorage.getItem(STORAGE_KEYS.LAST_READ_MESSAGE_ID);

      if (savedSessionId) setSessionId(savedSessionId);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages.length > 0 ? parsedMessages : [{ text: t('assistant:welcome'), isUser: false }]);
      }
      if (savedContactForm) setContactForm(JSON.parse(savedContactForm));
      if (savedUserInfoCollected) setUserInfoCollected(JSON.parse(savedUserInfoCollected));
      if (savedUnreadCount) setUnreadCount(parseInt(savedUnreadCount));
      if (savedLastReadMessageId) setLastReadMessageId(parseInt(savedLastReadMessageId));
    } catch (error) {
      console.error('Error loading chat state from localStorage:', error);
    }
  }, []);

  // Save chat state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACT_FORM, JSON.stringify(contactForm));
  }, [contactForm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_INFO_COLLECTED, JSON.stringify(userInfoCollected));
  }, [userInfoCollected]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNREAD_COUNT, unreadCount.toString());
  }, [unreadCount]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_READ_MESSAGE_ID, lastReadMessageId.toString());
  }, [lastReadMessageId]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.log('Could not request notification permission:', error);
      }
    }
  }, []);

  // Show browser notification
  const showNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'chat-message'
        });
      } catch (error) {
        console.log('Could not show notification:', error);
      }
    }
  }, []);

  // Notification sound using Web Audio API
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  }, []);

  // Store initial message before contact form
  const storeInitialMessage = useCallback(async (messageContent: string, messageType: string = 'text') => {
    try {
      await fetch('https://draminesaid.com/lucci/api/store_initial_message.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temp_session_id: tempSessionId,
          message_content: messageContent,
          message_type: messageType
        }),
      });
    } catch (error) {
      console.error('Error storing initial message:', error);
    }
  }, [tempSessionId]);

  const stopMessagePolling = useCallback(() => {
    console.log('Stopping message polling');
    if (messagePollingRef.current) {
      clearInterval(messagePollingRef.current);
      messagePollingRef.current = null;
    }
    setIsPollingMessages(false);
  }, []);

  // Start polling for new messages
  const startMessagePolling = useCallback((explicitSessionId?: string) => {
    const currentSessionId = explicitSessionId || sessionId;
    console.log('startMessagePolling called with:', { isPollingMessages, sessionId, explicitSessionId, currentSessionId });
    
    if (!currentSessionId) {
      console.log('Cannot start polling: no session ID');
      return;
    }
    
    if (isPollingMessages) {
      console.log('Polling already in progress, stopping current and restarting');
      stopMessagePolling();
    }
    
    console.log('Starting message polling for session:', currentSessionId);
    setIsPollingMessages(true);
    
    // First immediate check
    const pollMessages = async () => {
      try {
        console.log('Polling messages for session:', currentSessionId);
        const response = await fetch(`https://draminesaid.com/lucci/api/chat_messages.php?session_id=${currentSessionId}`);
        const data = await response.json();
        
        console.log('Polling response:', data);
        
        if (data.success && data.messages?.length > 0) {
          const agentMessages = data.messages.filter((msg: any) => msg.sender_type === 'agent');
          console.log('Agent messages found:', agentMessages.length);
          
          if (agentMessages.length > 0) {
            setMessages(prev => {
              // Get existing message IDs, filtering out undefined/null values
              const existingMessageIds = prev
                .map((msg: any) => msg.id_message)
                .filter(id => id !== undefined && id !== null);
              
              console.log('Existing message IDs:', existingMessageIds);
              
              // Filter new messages that don't already exist
              const newMessages = agentMessages.filter((msg: any) => 
                !existingMessageIds.includes(msg.id_message)
              );
              
              console.log('New messages to add:', newMessages.length);
              
              if (newMessages.length === 0) return prev;
              
              // Play sound and show notification for new messages
              playNotificationSound();
              setUnreadCount(prevCount => prevCount + newMessages.length);
              
              // Show browser notification for the latest message
              if (newMessages.length > 0) {
                const latestMessage = newMessages[newMessages.length - 1];
                showNotification(
                  'Nouveau message de Luxury Assistant',
                  latestMessage.message_content.substring(0, 100) + (latestMessage.message_content.length > 100 ? '...' : '')
                );
              }
              
              const formattedMessages = newMessages.map((msg: any) => ({
                id_message: msg.id_message,
                text: msg.message_content,
                isUser: false,
                imageUrl: msg.image_url ? `https://draminesaid.com/lucci/${msg.image_url}` : undefined,
                imageName: msg.image_name
              }));
              
              console.log('Adding formatted messages:', formattedMessages);
              return [...prev, ...formattedMessages];
            });
          }
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    };
    
    // Immediate first poll
    pollMessages();
    
    // Set up interval polling every 2 seconds (faster)
    messagePollingRef.current = setInterval(pollMessages, 2000);
    console.log('Message polling interval set up successfully');
  }, [sessionId, isPollingMessages, playNotificationSound, showNotification, stopMessagePolling]);

  // Initialize temp session ID and request notification permission
  useEffect(() => {
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setTempSessionId(tempId);
    requestNotificationPermission();

    // Start polling if we have a saved session
    const savedSessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
    const savedUserInfoCollected = localStorage.getItem(STORAGE_KEYS.USER_INFO_COLLECTED);
    
    if (savedSessionId && savedUserInfoCollected === 'true') {
      setTimeout(() => {
        startMessagePolling(savedSessionId);
      }, 2000);
    }
  }, [requestNotificationPermission, startMessagePolling]);


  // Handle message input change
  const handleMessageChange = useCallback((value: string) => {
    setMessage(value);
  }, []);

  // Handle contact form change
  const handleContactFormChange = useCallback((field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle send message - only store locally until form is filled
  const handleSendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    setMessage('');
    setMessages(prev => [...prev, { text: trimmedMessage, isUser: true }]);

    if (!userInfoCollected && !showContactForm) {
      // Store message for later sending after form submission
      storeInitialMessage(trimmedMessage, 'text');
      
      setTimeout(() => {
        setShowContactForm(true);
        setMessages(prev => [...prev, {
          text: t('chat:contactFormRequest'),
          isUser: false
        }]);
      }, 1000);
      return;
    }

    // Only send to API after form is filled
    if (userInfoCollected && sessionId) {
      console.log('Sending message to API for session:', sessionId);
      fetch('https://draminesaid.com/lucci/api/chat_messages.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          sender_type: 'client',
          sender_name: contactForm.name,
          message_content: trimmedMessage,
          message_type: 'text'
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent response:', data);
        if (data.success && !isPollingMessages) {
          console.log('Starting polling after message send');
          startMessagePolling();
        }
      })
      .catch(error => console.error('Error sending message:', error));
    }
  }, [message, userInfoCollected, showContactForm, sessionId, contactForm.name, isPollingMessages, startMessagePolling, storeInitialMessage]);

  // Handle key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Check agent status
  const checkAgentStatus = useCallback(async () => {
    try {
      const response = await fetch('https://draminesaid.com/lucci/api/agent_status.php', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.status) {
          const isOnline = data.status.is_online === '1' || data.status.is_online === 1 || data.status.is_online === true;
          return isOnline;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking agent status:', error);
      return false;
    }
  }, []);

  // Handle contact form submit
  const handleContactSubmit = useCallback(async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.phone) return;
    
    try {
      const sessionResponse = await fetch('https://draminesaid.com/lucci/api/chat_sessions.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          client_name: contactForm.name,
          client_email: contactForm.email,
          client_phone: contactForm.phone
        }),
      });
      
      const sessionData = await sessionResponse.json();
      
      if (sessionData.success) {
        setSessionId(sessionData.session_id);
        setUserInfoCollected(true);
        setShowContactForm(false);
        
        if (tempSessionId) {
          await fetch('https://draminesaid.com/lucci/api/transfer_temp_messages.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              temp_session_id: tempSessionId,
              real_session_id: sessionData.session_id,
              client_name: contactForm.name
            }),
          });
        }
        
        // Check agent status and show appropriate message
        const isAgentOnline = await checkAgentStatus();
        console.log('Agent online status:', isAgentOnline);
        
        // Force stop any existing polling and start fresh
        console.log('Force stopping existing polling before starting new');
        stopMessagePolling();
        
        // Start polling immediately after session creation
        console.log('Starting polling with session ID:', sessionData.session_id);
        setTimeout(() => {
          console.log('About to call startMessagePolling with sessionId:', sessionData.session_id);
          // Pass session ID directly to avoid state timing issues
          startMessagePolling(sessionData.session_id);
        }, 1000); // Increased delay to ensure everything is ready
        
        setTimeout(() => {
          const statusMessage = isAgentOnline 
            ? t('chat:agentStatus.online')
            : t('chat:agentStatus.offline', { phone: contactForm.phone });
            
          setMessages(prev => [...prev, {
            text: `${t('chat:contactFormThank', { name: contactForm.name })} ${statusMessage}`,
            isUser: false
          }]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  }, [contactForm, tempSessionId, checkAgentStatus, stopMessagePolling, startMessagePolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMessagePolling();
    };
  }, [stopMessagePolling]);

  // Clear unread count when opened and mark messages as read
  const clearUnreadCount = useCallback(() => {
    setUnreadCount(0);
    
    // Update last read message ID to the latest message
    const latestMessageId = messages
      .filter(msg => msg.id_message)
      .reduce((maxId, msg) => Math.max(maxId, msg.id_message || 0), 0);
    
    if (latestMessageId > lastReadMessageId) {
      setLastReadMessageId(latestMessageId);
    }
  }, [messages, lastReadMessageId]);

  // Clear chat data
  const clearChatData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.CONTACT_FORM);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO_COLLECTED);
    localStorage.removeItem(STORAGE_KEYS.UNREAD_COUNT);
    localStorage.removeItem(STORAGE_KEYS.LAST_READ_MESSAGE_ID);
    
    setSessionId('');
    setMessages([{ text: t('assistant:welcome'), isUser: false }]);
    setContactForm({ name: '', email: '', phone: '' });
    setUserInfoCollected(false);
    setUnreadCount(0);
    setLastReadMessageId(0);
    setShowContactForm(false);
    stopMessagePolling();
  }, [stopMessagePolling]);

  return {
    message,
    messages,
    showContactForm,
    contactForm,
    sessionId,
    userInfoCollected,
    unreadCount,
    lastReadMessageId,
    handleMessageChange,
    handleContactFormChange,
    handleSendMessage,
    handleKeyPress,
    handleContactSubmit,
    clearUnreadCount,
    clearChatData
  };
};