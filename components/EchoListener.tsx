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

        channel.listen('.sync.nots', (event: any) => {
            if (event?.user_id && event?.user_id === user.id){
                if (event?.message){
                    let data = event.message;
                    if (data.type === ""){
                        
                    }
                }
            }
        });
    };

    initEcho();
}, [user?.id]);



return null;
};
