import { endpoint } from "@/constants/api";

export var isLoggedIn = false;

export function getCurrentUser() {

}

export async function register(name: string, surname: string, email: string, password: string) {
    const loginDetails = new FormData();
    loginDetails.append("name", name);
    loginDetails.append("surname", surname);
    loginDetails.append("email", email);
    loginDetails.append("password", password);
    const response = await fetch(`${endpoint}/users`, {
        method: "POST",
        body: loginDetails,
        headers: {
            "Content-Type": "application/json",
        }
      });
    console.log(response)
    const data = await response.json();
    console.log(data); // JSON data parsed by `data.json()` call
    return data;   
}

export async function login() {
       
}
export function logout() {
    
}