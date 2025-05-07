import { read, store } from "./settings";
import { endpoint } from "@/constants/api";




export default async function addTeam(name: string) {

    const response = await fetch(`${endpoint}/teams`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await read('apiToken')}`,
        },
        body: JSON.stringify({
            name: name,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        console.error(`Błąd ${response.status}: ${response.statusText}`);
    }
}

export async function getTeams(page = 1) {
    const response = await fetch(`${endpoint}/teams`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await read('apiToken')}`,
        },
        body: JSON.stringify({
            name: page,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        console.error(`Błąd ${response.status}: ${response.statusText}`);
    }
}

export async function deleteTeam(teamId: number) {
    const response = await fetch(`${endpoint}/teams`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await read('apiToken')}`,
        },
        body: JSON.stringify({
            name: teamId,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        console.error(`Błąd ${response.status}: ${response.statusText}`);
    }
}

export async function updateTeam(teamId: number, name: number){

    const response = await fetch(`${endpoint}/teams`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await read('apiToken')}`,
        },
        body: JSON.stringify({
            name: name,
            teamId: teamId,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        console.error(`Błąd ${response.status}: ${response.statusText}`);
    }
}