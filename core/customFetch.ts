import { endpoint } from "@/constants/api";
import { read, store } from "./settings";

export async function fetchApi(url: string, options: RequestInit = {}) {
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${await read("apiToken")}`
    };

    try {
        const response = await fetch(`${endpoint}${url}`, { ...options, headers });

        if (response.status === 401) {
            const refreshDetails = new FormData();
            refreshDetails.append("refresh_token", await read("refreshToken"));
            const refreshRefresponse = await fetch(`${endpoint}/refresh-token`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${await read("apiToken")}`
                },
                body: refreshDetails,
                redirect: "follow"
            })
            if (refreshRefresponse.status === 200) {
                const data = await refreshRefresponse.json();
                await store("apiToken", data.api_token);
                await store("refreshToken", data.refresh_token);
                headers["Authorization"] = `Bearer ${data.api_token}`;
                const retryResponse = await fetch(`${endpoint}/${url}`, { ...options, headers });
                if (retryResponse.ok) {
                    return retryResponse;
                }
            } else {
                throw new Error("Failed to refresh token");
            }

        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};