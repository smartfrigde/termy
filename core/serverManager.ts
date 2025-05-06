import { ServerType } from "@/types/Server";
import { read, store } from "./settings";

export async function saveServers(servers: ServerType[]) {
    await store("servers", servers);
}

export async function getServers(): Promise<ServerType[]> {
    const servers = await read("servers");
    return servers;
}

export async function addServer(server: ServerType) {
    const servers = await getServers();
    console.log(servers);
    servers.push(server);
    await saveServers(servers);
}

export async function removeServer(serverId: string) {
    const servers = await getServers();
    const newServers = servers.filter((server) => server.id !== serverId);
    await saveServers(newServers);
}

export async function updateServer(server: ServerType) {
    const servers = await getServers();
    const index = servers.findIndex((s) => s.id === server.id);
    if (index !== -1) {
        servers[index] = server;
        await saveServers(servers);
    }
}
export async function getServerById(serverId: string): Promise<ServerType | null> {
    const servers = await getServers();
    const server = servers.find((s) => s.id === serverId);
    return server || null;
}
