import { TeamType } from "@/types/Team";
import { read, store } from "./settings";
import { endpoint } from "@/constants/api";
import { addTeam as createTeam } from "./slices/teamSlice";
import { useSelector } from "react-redux";




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
