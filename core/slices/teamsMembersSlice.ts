import type { MembersResponse, TeamPageData } from "@/types/TeamMember";
import { createSlice } from "@reduxjs/toolkit";

export const teamMembersSlice = createSlice({
    name: "team_members",
    initialState: {
        members: [] as MembersResponse[],
        page_data: [] as TeamPageData[],
    },
    reducers: {
        addTeamMember(
            state: {
                members: MembersResponse[];
                page_data: TeamPageData[];
            },
            action: {
                payload: {
                    members: MembersResponse;
                    pageData: TeamPageData;
                };
            },
        ) {
            state.members.push(action.payload.members);

            const index = state.page_data.findIndex((page) => page?.team_id === action?.payload?.pageData?.team_id);
            if (index !== -1) {
                state.page_data[index] = action.payload.pageData;
            } else {
                state.page_data.push(action.payload.pageData);
            }
        },

        removeTeamMember(state, action: { payload: number }) {
            const index = state.members.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.members.splice(index, 1);
            }
        },

        setTeamMember(state, action: { payload: MembersResponse }) {
            const index = state.members.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.members[index] = action.payload;
            }
        },
    },
});

export const { addTeamMember, removeTeamMember, setTeamMember } = teamMembersSlice.actions;

export const PageData = (state: {
    team_members: { page_data: TeamPageData[] };
}) => state.team_members.page_data;
export const Members = (state: {
    team_members: { members: MembersResponse[] };
}) => state.team_members.members;

export const hasMoreMembers = (pageData: TeamPageData[], teamId: number): boolean => {
    const teamPage = pageData.find((item) => item?.team_id === teamId);

    if (!teamPage) return true;

    return teamPage.current_page < teamPage.total_pages;
};

export const membersInTeam = (members: MembersResponse[], teamId: number): MembersResponse[] => {
    console.log(members);
    console.log(members.filter((item) => item?.team_id === teamId));
    return members.filter((item) => item?.team_id === teamId);
};

export const teamCurrentPage = (pageData: TeamPageData[], teamId: number): number => {
    const teamPage = pageData.find((item) => item?.team_id === teamId);

    if (!teamPage) return 0;

    return teamPage.current_page;
};
