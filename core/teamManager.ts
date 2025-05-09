import {fetchApi} from "@/core/customFetch";


export default async function addTeam(name: string) {
    try {
        const response = await fetchApi(`/teams/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
            return null;
        }
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}


export async function getTeams(page = 1) {
    try {
        
        const response = await fetchApi(`/teams?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
        
        const response = await fetchApi(`/teams/${teamId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Błąd ${response.status}: ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}

export async function updateTeam(teamId: number, name: string) {
    try {
        
        const response = await fetchApi(`/teams/${teamId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
            
        } else {
            console.error(`Błąd ${response.status}: ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Wystąpił błąd sieci:", error);
        return null;
    }
}

export async function getMembers(teamId: number, page = 1){
    try {
        const response = await fetchApi(`/teams/${teamId}/members?page=${page}`, {
            method: "GET",
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

export async function deleteMember(teamId: number, userId: number) {
    try {
        const response = await fetchApi(`/teams/${teamId}/members/${userId}`, {
            method: "DELETE",
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
