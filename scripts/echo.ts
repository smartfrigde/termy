import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native'; // <- ważne dla RN!
import { read } from '@/core/settings';

export async function getEcho() {
  const apiToken = await read('apiToken');

  // Ustaw Pusher globalnie (dla Echo)
  global.Pusher = Pusher;

  const echo = new Echo({
    broadcaster: 'reverb',
    key: 'local',
    wsHost: 'localhost',
    wsPort: 8765,
    wssPort: 8765,
    forceTLS: false,
    encrypted: false,
    disableStats: true,
  authEndpoint: 'http://localhost/broadcasting/auth',
  });

  return echo;
}
