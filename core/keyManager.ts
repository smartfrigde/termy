import type { KeyType } from "@/types/Key";
import { fetchApi } from "./customFetch";

export async function getKeys() {
    const response = await fetchApi("/keys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    return await response.json();
}

export async function createKey(key: KeyType) {
    const serverDetails = new FormData();
    serverDetails.append("name", key.name);
    serverDetails.append("public_key", key.publicKey);
    serverDetails.append("private_key", key.privateKey);
    if (key.passphrase) {
        serverDetails.append("password", key.passphrase);
    }
    return await fetchApi("/keys", {
        method: "POST",
        body: serverDetails,
    });
}

export async function deleteKey(id: string): Promise<Response> {
    return await fetchApi(`/keys/${id}`, {
        method: "DELETE",
    });
}

export async function editKey(key: KeyType) {
    const serverDetails = new FormData();
    if (key.id) {
        serverDetails.append("id", key.id);
    }
    serverDetails.append("name", key.name);
    serverDetails.append("public_key", key.publicKey);
    serverDetails.append("private_key", key.privateKey);
    if (key.passphrase) {
        serverDetails.append("password", key.passphrase);
    }
    return await fetchApi(`/keys/${key.id}`, {
        method: "PATCH",
        body: serverDetails,
    });
}
