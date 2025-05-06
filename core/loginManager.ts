import { endpoint } from "@/constants/api";
import { read, store } from "./settings";

export var isLoggedIn = read("user") !== null;

export function getCurrentUser() {

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
  if (data.user) {
    login(email, password);
  }
  console.log(data);
  return data;
}

export async function login(email: string, password: string) {
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
    isLoggedIn = true;
    await store("user", data.user);
    await store("apiToken", data.api_token);
    await store("refreshToken", data.refresh_token);
  }
  console.log(data);
  return data;
}

export function logout() {
  isLoggedIn = false;
  store("user", null);
  store("apiToken", null);
  store("refreshToken", null);
  console.log("Logged out");
}