import { useEffect, useRef, useState } from 'react';

export const usePolling = (callback, interval = 2000, dependencies = []) => {
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef(null);

  const startPolling = () => {
    if (intervalRef.current) return;
    setIsPolling(true);
    intervalRef.current = setInterval(callback, interval);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPolling(false);
    }
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  useEffect(() => {
    if (isPolling) {
      stopPolling();
      startPolling();
    }
  }, dependencies);

  return { startPolling, stopPolling, isPolling };
};