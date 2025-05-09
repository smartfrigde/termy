import { ServerType } from "@/types/Server";
import { fetchApi } from "./customFetch";

export async function getServers() {
    const response = await fetchApi(`/ssh`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    console.log(response)
    const data = await response.json();
    return data;
}

export async function createServer(server: ServerType) {
    const serverDetails = new FormData();
    serverDetails.append("name", server.name);
    serverDetails.append("hostname", server.hostname);
    serverDetails.append("port", server.port.toString());
    serverDetails.append("password", server.password);
    serverDetails.append("login", server.login);
    const response = await fetchApi("/ssh", {
        method: "POST",
        body: serverDetails
    });
    return response;
}

export async function deleteServer(id: string) : Promise<Response> {
    const response = await fetchApi(`/ssh/${id}`, {
        method: "DELETE"
    });
    return response;
}

