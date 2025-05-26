import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEcho } from "@/scripts/echo";
import { selectSyncVersion, selectUser } from "@/core/slices/authSlice";
import { DataCategories } from "@/core/DataCategoriesManager";
import { resetTeams } from "@/core/slices/teamSlice";
import { resetSshSlice } from "@/core/slices/sshSlice";
import { resetTeamMembers } from "@/core/slices/teamsMembersSlice";

export const EchoListener = () => {
    const user = useSelector(selectUser);
    const syncVersion = useSelector(selectSyncVersion);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user?.id) return;

        let channel: any;

        const initEcho = async () => {
            const echo = await getEcho();
            const channelName = `sync.user.${user.id}`;
            channel = echo.private(channelName);

            channel.listen('.sync.nots', (event: any) => {
                const data = JSON.parse(event?.message);
                if (!data || event.user_id !== user.id) return;

                if (data.type !== "report_new_sync_version") return;

                if (syncVersion >= data.new_synchronization_version) return;

                switch (data.category) {
                    case DataCategories.ssh:
                        dispatch(resetSshSlice());
                        break;
                    case DataCategories.team:
                        dispatch(
                            resetTeams(),
                            resetTeamMembers()
                        );
                        break;
                    case DataCategories.members:
                        dispatch(resetTeamMembers());
                        break;
                    default:
                        console.warn("Nieobsługiwana kategoria:", data.category);
                        break;
                }
            });
        };

        initEcho();

        return () => {
            if (channel) {
                channel.stopListening('.sync.nots');
            }
        };
    }, [user?.id, syncVersion]);


    return null;
};
