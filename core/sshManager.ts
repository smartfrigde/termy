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
    const response = await fetch(`${endpoint}/ssh`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await read("apiToken")}`
        },
        body: JSON.stringify({
            port: server.port,
            name: server.name, 
            hostname: server.hostname, 
            password: server.password, 
            login: server.login
        })
    });
    console.log(response)
    const data = await response.json();
    return data;
}