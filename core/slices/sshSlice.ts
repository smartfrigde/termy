import type { ServerType } from "@/types/Server";
import { createSlice } from "@reduxjs/toolkit";
export const sshSlice = createSlice({
    name: "ssh",
    initialState: {
        servers: [] as ServerType[],
        keys: [], // to-do: add GPG keys to the slice
    },
    reducers: {
        setServers: (state, action: { payload: ServerType[] }) => {
            state.servers = action.payload;
        },
        addServer: (state, action: { payload: ServerType }) => {
            const array = state.servers;
            array.push(action.payload);
            state.servers = array;
        },
        removeServer: (state, action: { payload: string }) => {
            const array = state.servers;
            const index = array.findIndex((server) => server.id === action.payload);
            if (index !== -1) {
                array.splice(index, 1);
                state.servers = array;
            }
        },
    },
});
export const selectServers = (state: { ssh: { servers: ServerType[] } }) => state.ssh.servers;
export const { setServers, addServer, removeServer } = sshSlice.actions;

export const filterTeamServers = (servers: ServerType[], teamId: number) => {
    if (!servers) return [];
    if (!teamId) return servers;
    return servers.filter((server) => server.team_id === teamId);
};
