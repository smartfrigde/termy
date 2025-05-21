import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getEcho } from "@/scripts/echo";
import { selectUser } from "@/core/slices/authSlice";

export const EchoListener = () => {
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user?.id) {
            getEcho().then((echo) => {
                echo
                    .private(`sync.user.${user.id}`)
                    .listen('.sync.nots', (event: any) => {
                        console.log('📩 Odebrano wiadomość:', event);
                    });
            });
        }
    }, [user?.id]);

    return null;
};
