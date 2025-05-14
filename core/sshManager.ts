import type { ServerType } from "@/types/Server";
import { fetchApi } from "./customFetch";

export async function getServers() {
    const response = await fetchApi(`/ssh`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    return await response.json();
}

export async function createServer(server: ServerType) {
    const serverDetails = new FormData();
    serverDetails.append("name", server.name);
    serverDetails.append("hostname", server.hostname);
    serverDetails.append("port", server.port.toString());
    serverDetails.append("password", server.password);
    serverDetails.append("login", server.login);
    if (server.team_id && server.team_id !== 0) {
        serverDetails.append("team_id", server.team_id.toString());
    }
    return await fetchApi("/ssh", {
        method: "POST",
        body: serverDetails,
    });
}

export async function deleteServer(id: string): Promise<Response> {
    return await fetchApi(`/ssh/${id}`, {
        method: "DELETE",
    });
}

export async function editServer(server: ServerType) {
    const serverDetails = new FormData();
    if (server.id) {
        serverDetails.append("id", server.id);
    }
    serverDetails.append("name", server.name);
    serverDetails.append("hostname", server.hostname);
    serverDetails.append("port", server.port.toString());
    serverDetails.append("password", server.password);
    serverDetails.append("login", server.login);
    return await fetchApi(`/ssh/${server.id}`, {
        method: "PATCH",
        body: serverDetails,
    });
}
