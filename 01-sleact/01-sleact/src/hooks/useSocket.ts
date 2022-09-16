import { useCallback } from 'react';
import io from 'socket.io-client';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) return [undefined, disconnect];

  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'], // HTTP 요청 말고, websocket 만 사용해야할 때
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
