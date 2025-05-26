import { read } from "@/core/settings";
import Echo, { type Broadcaster } from "laravel-echo";
import Pusher from "pusher-js/react-native"; // <- ważne dla RN!

export async function getEcho(): Promise<Echo<keyof Broadcaster>> {
    const apiToken = await read("apiToken");

    global.Pusher = Pusher;

    const echo = new Echo({
        broadcaster: "reverb",
        key: "local",
        wsHost: "localhost",
        wsPort: 8765,
        wssPort: 8765,
        forceTLS: false,
        encrypted: false,
        disableStats: true,
        authEndpoint: "http://localhost/broadcast/auth",
        auth: {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        },
    });

    return echo;
}
