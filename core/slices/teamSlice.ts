import { ServerType } from '@/types/Server';
import { TeamType } from './../../types/Team.d';
import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
    name: "team",
    initialState: {
        teams: [] as TeamType[],
        servers: [] as ServerType[],
        totalPages: 1,
    },
    reducers: {
        setTeams: (state, action: { payload: TeamType[] }) => {
            state.teams = action.payload;
        },
        addTeam: (state, action: { payload: TeamType }) => {
            const array = state.teams;
            array.push(action.payload);
            state.teams = array;
        },
        removeTeam: (state, action: { payload: number }) => {
            const array = state.teams;
            const index = array.findIndex((team) => team.id === action.payload);
            if (index !== -1) {
                array.splice(index, 1);
                state.teams = array;
            }
        },
    },
});

export const selectedTeams = (state: { team: { teams: TeamType[]; }; }) => state.team.teams;
export const { setTeams, addTeam, removeTeam } = teamSlice.actions;