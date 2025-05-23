import { endpoint } from "../constants/api";
import { read, store } from "./settings";
import {setSyncVersion} from "./slices/authSlice";

export async function fetchApi(url: string, options: RequestInit = {}) {
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${await read("apiToken")}`,
    };

    const refreshToken = async () => {
        const refreshDetails = new FormData();
        refreshDetails.append("refresh_token", await read("refreshToken"));
        const refreshResponse = await fetch(`${endpoint}/refresh-token`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${await read("apiToken")}`,
            },
            body: refreshDetails,
            redirect: "follow",
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
                    headers.Authorization = `Bearer ${newToken}`;
                    const retryResponse = await fetch(`${endpoint}${url}`, {
                        ...options,
                        headers,
                    });
                    if (retryResponse.ok) {
                        await changeSyncVersion(response);

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

        if (response.ok) {
            await changeSyncVersion(response);
        }

        return response;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function changeSyncVersion(response: Response) {
    const clone = response.clone();
    try {
        const data = await clone.json();
        if (data?.sync_version) {
            setSyncVersion(data.sync_version);
        }
    } catch (err) {
        console.warn("Nie udało się odczytać sync_version:", err);
    }
}
