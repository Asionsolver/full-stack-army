import { useEffect, useRef, useCallback, useState } from 'react';

interface UseWebSocketOptions {
  url: string;
  onMessage?: (data: unknown) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

interface UseWebSocketReturn {
  sendMessage: (data: unknown) => void;
  isConnected: boolean;
  lastMessage: unknown | null;
}

export const useWebSocket = (options: UseWebSocketOptions): UseWebSocketReturn => {
  const { url, onMessage, onConnected, onDisconnected, reconnectAttempts = 5, reconnectInterval = 3000 } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<unknown>(null);
  const reconnectCountRef = useRef(0);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectCountRef.current = 0;
      onConnected?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
        onMessage?.(data);
      } catch {
        setLastMessage(event.data);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      onDisconnected?.();
      if (reconnectCountRef.current < reconnectAttempts) {
        reconnectCountRef.current++;
        setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, onMessage, onConnected, onDisconnected, reconnectAttempts, reconnectInterval]);

  const sendMessage = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { sendMessage, isConnected, lastMessage };
};