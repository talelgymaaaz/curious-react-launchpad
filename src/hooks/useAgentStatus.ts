import { useState, useEffect, useCallback, useRef } from 'react';

export const useAgentStatus = () => {
  const [agentsOnline, setAgentsOnline] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check agent status
  const checkAgentStatus = useCallback(async () => {
    try {
      console.log('Checking agent status at:', new Date().toISOString());
      
      const response = await fetch('https://draminesaid.com/lucci/api/agent_status.php', {
        method: 'GET',
        headers: { 
          'Accept': 'application/json'
        },
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Agent status response:', data);
        
        if (data.success && data.status) {
          const isOnline = data.status.is_online === '1' || data.status.is_online === 1 || data.status.is_online === true;
          console.log('Agent is online:', isOnline, '(raw value:', data.status.is_online, ')');
          setAgentsOnline(isOnline);
          return isOnline;
        } else {
          console.log('Invalid response structure');
          setAgentsOnline(false);
          return false;
        }
      } else {
        console.log('Response not ok:', response.status, response.statusText);
        setAgentsOnline(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking agent status:', error);
      setAgentsOnline(false);
      return false;
    }
  }, []);

  // Setup polling with smart intervals
  useEffect(() => {
    let currentInterval: NodeJS.Timeout | null = null;
    
    const setupPolling = (isOnline: boolean) => {
      // Clear existing interval
      if (currentInterval) {
        clearInterval(currentInterval);
      }
      
      // Set interval based on status: 1 minute if online, 5 minutes if offline
      const intervalTime = isOnline ? 60000 : 300000; // 1 min or 5 min
      console.log(`Setting up polling every ${intervalTime / 1000} seconds (agent is ${isOnline ? 'online' : 'offline'})`);
      
      currentInterval = setInterval(async () => {
        const newStatus = await checkAgentStatus();
        // If status changed, update polling interval
        if (newStatus !== isOnline) {
          setupPolling(newStatus);
        }
      }, intervalTime);
    };
    
    // Initial status check and setup
    const initializeStatus = async () => {
      const initialStatus = await checkAgentStatus();
      setupPolling(initialStatus);
    };
    
    initializeStatus();
    
    // Cleanup on unmount
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, [checkAgentStatus]);

  return { agentsOnline };
};