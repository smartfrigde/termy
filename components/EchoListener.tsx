import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEcho } from "@/scripts/echo";
import { selectSyncVersion, selectUser } from "@/core/slices/authSlice";
import { DataCategories } from "@/core/DataCategoriesManager";
import { currentTeamsPage, resetTeams } from "@/core/slices/teamSlice";
import { resetSshSlice } from "@/core/slices/sshSlice";
import { resetTeamMembers } from "@/core/slices/teamsMembersSlice";
import { getTeams } from "@/core/teamManager";
import { TeamType } from "@/types/Team";
import { addTeam as addTeamToSlice } from "@/core/slices/teamSlice";

export const EchoListener = () => {
    const user = useSelector(selectUser);
    const syncVersion = useSelector(selectSyncVersion);
    const dispatch = useDispatch();
    const teamCurrnetPage = useSelector(currentTeamsPage);

    useEffect(() => {
        if (!user?.id) return;

        let channel: any;

        const initEcho = async () => {
            const echo = await getEcho();
            const channelName = `sync.user.${user.id}`;
            channel = echo.private(channelName);

            channel.listen('.sync.nots', async (event: any) => {
                const data = JSON.parse(event?.message);
                if (!data || event.user_id !== user.id) return;

                if (data.type !== "report_new_sync_version") return;

                if (syncVersion >= data.new_synchronization_version) return;

                switch (data.category) {
                    case DataCategories.ssh:
                        dispatch(resetSshSlice());
                        break;
                    case DataCategories.team:
                        const maxPage = teamCurrnetPage || 1;
                        dispatch(
                            resetTeams(),
                        );

                        for (let page = 1; page <= maxPage; page++) {
                            try {
                                const data = await getTeams(page);
                                if (data?.teams && Array.isArray(data.teams)) {
                                    data.teams.forEach((team: TeamType) => {
                                        dispatch(addTeamToSlice({
                                            team,
                                            totalPages: data.total_pages,
                                            currentPage: data.current_page,
                                        }));
                                    });
                                }
                            } catch (error) {
                                console.error(error);
                                break;
                            }
                        }
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
