import { endpoint } from "@/constants/api";
import { ServerType } from "@/types/Server";
import { read } from "./settings";

export async function getServers() {
    const response = await fetch(`${endpoint}/ssh`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await read("apiToken")}`
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
    const response = await fetch(`${endpoint}/ssh`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await read("apiToken")}`
        },
        body: serverDetails
    });
    return response;
}

export async function deleteServer(id: string) : Promise<Response> {
    const response = await fetch(`${endpoint}/ssh/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${await read("apiToken")}`
        }
    });
    return response;
}

