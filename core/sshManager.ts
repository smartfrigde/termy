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

<<<<<<< HEAD
export async function createServer(server: ServerType) {
=======
export async function createServer(server: ServerType) : Promise<Response> {
    const serverDetails = new FormData();
    serverDetails.append("name", server.name);
    serverDetails.append("hostname", server.hostname);
    serverDetails.append("port", server.port.toString());
    serverDetails.append("password", server.password);
    serverDetails.append("login", server.login);
>>>>>>> 69543597df174ec4dd1e7e9cf4526da08d6a33d7
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

