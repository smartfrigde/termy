import { endpoint } from "@/constants/api";

import { read, store } from "./settings";
import { fetchApi } from "@/core/customFetch";


export async function getCurrentUser(): Promise<User | null> {
  const user = await read("user");
  if (user) {
    console.log("User is logged in", user);
    return user;
  } else {
    console.log("User is not logged in");
    return null;
  }
}

export async function register(name: string, surname: string, email: string, password: string) {
  console.log("Registering with ", email);
  const loginDetails = new FormData();
  loginDetails.append("name", name);
  loginDetails.append("surname", surname);
  loginDetails.append("email", email);
  loginDetails.append("password", password);
  const response = await fetch(`${endpoint}/users`, {
    method: "POST",
    body: loginDetails
  });
  console.log(response)
  const data = await response.json();
  console.log(data);
  return data;
}

export async function login(email: string, password: string) {
  console.log(endpoint)
  console.log("Logging in with ", email);
  const loginDetails = new FormData();
  loginDetails.append("email", email);
  loginDetails.append("password", password);
  const response = await fetch(`${endpoint}/login`, {
    method: "POST",
    body: loginDetails
  });
  console.log(response)
  const data = await response.json();
  if (data.user) {
    await store("user", data.user);
    await store("apiToken", data.api_token);
    await store("refreshToken", data.refresh_token);
  }
  console.log(data);
  return data;
}

export async function update(id: number, name?: string, surname?: string, email?: string, password?: string | null) {

  const body: Record<string, string> = {};
  if (name !== undefined) body.name = name;
  if (surname !== undefined) body.surname = surname;
  if (email !== undefined) body.email = email;
  if (password !== undefined && password !== null) body.password = password;


  try {
    const response = await fetchApi(`/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    return await response.json();
  } catch (error) {
    console.error(error)
  }
}

// export function logout() {
//   store("user", null);
//   store("apiToken", null);
//   store("refreshToken", null);
//   console.log("Logged out");
// }

