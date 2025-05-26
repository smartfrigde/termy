import { createSlice } from "@reduxjs/toolkit";
import type { TeamType } from "./../../types/Team.d";

export const teamSlice = createSlice({
    name: "team",
    initialState: {
        teams: [] as TeamType[],
        totalPages: 2,
        currentPage: 0,
        totalTeamsCount: 1,
    },
    reducers: {
        setTeams: (state, action: { payload: TeamType[] }) => {
            state.teams = action.payload;
        },

        setTeam: (state, action: { payload: TeamType }) => {
            const index = state.teams.findIndex((team) => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = action.payload;
                state.totalTeamsCount = -1;
            }
        },

        addTeam: (
            state: {
                totalPages: number;
                currentPage: number;
                teams: TeamType[];
                totalTeamsCount: number;
            },
            action: {
                payload: {
                    team: TeamType;
                    totalPages: number;
                    currentPage: number;
                    totalTeamsCount?: number;
                };
            },
        ) => {
            state.teams.push(action.payload.team);
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;

            state.totalTeamsCount = action.payload.totalTeamsCount ?? state.totalTeamsCount + 1;
        },

        removeTeam: (state, action: { payload: number }) => {
            const index = state.teams.findIndex((team) => team.id === action.payload);
            if (index !== -1) {
                state.teams.splice(index, 1);
                state.totalTeamsCount = state.teams.length;
            }
        },

        resetTeams: (state) => {
            state.teams = [] as TeamType[];
            state.totalPages = 2;
            state.currentPage = 0;
            state.totalTeamsCount = 1;
        },
    },
});

export const selectedTeams = (state: { team: { teams: TeamType[] } }) => state.team.teams;

export const hasMoreTeams = (state: {
    team: { currentPage: number; totalPages: number };
}) => {
    return state.team.currentPage < state.team.totalPages;
};

export const { resetTeams, setTeams, addTeam, removeTeam, setTeam } = teamSlice.actions;

export const teamsCount = (state: { team: { teams: TeamType[] } }) => {
    return state.team.teams.length;
};

export const totalUserTeamsCount = (state: {
    team: { totalTeamsCount: number };
}) => state.team.totalTeamsCount;
export const currentTeamsPage = (state: { team: { currentPage: number } }) => state.team.currentPage;
