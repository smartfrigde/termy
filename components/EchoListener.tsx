import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getEcho } from "@/scripts/echo";
import { selectUser } from "@/core/slices/authSlice";

export const EchoListener = () => {
    const user = useSelector(selectUser);

useEffect(() => {
    if (!user?.id) return;

    const initEcho = async () => {
        const echo = await getEcho();
        const channelName = `sync.user.${user.id}`;
        const channel = echo.private(channelName);

        // 🔌 Nasłuchuj połączenia
        echo.connector.pusher.connection.bind('connected', () => {
            console.log('✅ Połączono z WebSocket');
        });

        // 📡 Nasłuch wiadomości
        channel.listen('.sync.nots', (event: any) => {
            console.log('📩 Odebrano wiadomość:', event);
        });
    };

    initEcho();
}, [user?.id]);



return null;
};
