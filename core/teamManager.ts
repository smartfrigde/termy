import { read, store } from "./settings";
import { endpoint } from "@/constants/api";



const API_URL = `${endpoint}/teams`;

export default async function addTeam(name: string) {
    try {
        const response = await fetch(`${API_URL}/`, {
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
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}


export async function getTeams(page = 1) {
    try {
        const token = await read('apiToken');
        const response = await fetch(`${endpoint}/teams?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error(`Błąd ${response.status}: ${response.statusText}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}


export async function deleteTeam(teamId: number) {
    try {
        const token = await read('apiToken');
        const response = await fetch(`${API_URL}/${teamId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Błąd ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}

export async function updateTeam(teamId: number, name: string) {
    try {
        const token = await read('apiToken');
        const response = await fetch(`${API_URL}/${teamId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Błąd ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}
