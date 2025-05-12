import { endpoint } from "@/constants/api";
import { read, store } from "./settings";

export async function fetchApi(url: string, options: RequestInit = {}) {
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${await read("apiToken")}`
    };

    const refreshToken = async () => {
        const refreshDetails = new FormData();
        refreshDetails.append("refresh_token", await read("refreshToken"));
        const refreshResponse = await fetch(`${endpoint}/refresh-token`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${await read("apiToken")}`
            },
            body: refreshDetails,
            redirect: "follow"
        });

        if (refreshResponse.status === 200) {
            const data = await refreshResponse.json();
            await store("apiToken", data.api_token);
            await store("refreshToken", data.refresh_token);
            return data.api_token; // Return the new token
        } else {
            throw new Error("Failed to refresh token");
        }
    };

    try {
        const response = await fetch(`${endpoint}${url}`, { ...options, headers });

        if (response.status === 401) {
            let attempts = 0;
            while (attempts < 2) {
                try {
                    const newToken = await refreshToken();
                    headers["Authorization"] = `Bearer ${newToken}`;
                    const retryResponse = await fetch(`${endpoint}${url}`, { ...options, headers });
                    if (retryResponse.ok) {
                        return retryResponse;
                    }
                } catch (error) {
                    attempts++;
                    if (attempts >= 2) {
                        throw new Error("Failed to refresh token after 2 attempts");
                    }
                }
            }
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};