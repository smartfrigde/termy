import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import { read } from '@/core/settings'; // dopasuj ścieżkę

let echoInstance: Echo | null = null;

export const getEcho = async (): Promise<Echo> => {
  if (echoInstance) return echoInstance;

  window.Pusher = Pusher;

  const token = await read('apiToken');

  echoInstance = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    wsHost: 'localhost',
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return echoInstance;
};

export const disconnectEcho = () => {
  if (echoInstance) {
    echoInstance.disconnect();
    echoInstance = null;
  }
};
