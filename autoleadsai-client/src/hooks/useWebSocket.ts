import { useEffect, useCallback } from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';

interface WebSocketEventHandlers {
  [event: string]: (...args: any[]) => void;
}

export const useWebSocketEvents = (handlers: WebSocketEventHandlers) => {
  const { socket, isConnected } = useWebSocket();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const registeredEvents: string[] = [];

    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
      registeredEvents.push(event);
    });

    return () => {
      registeredEvents.forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket, isConnected, handlers]);
};

export const useWebSocketEmit = () => {
  const { socket, isConnected } = useWebSocket();

  const emit = useCallback(
    (event: string, data: any) => {
      if (socket && isConnected) {
        socket.emit(event, data);
      }
    },
    [socket, isConnected]
  );

  return { emit, isConnected };
};