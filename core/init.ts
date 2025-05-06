
import { getServers, saveServers } from "./serverManager";

// Everything in this file is executed before the app is loaded
// This is a good place to do any setup that needs to happen before the app is loaded

async function init() {
    console.log("Initializing app...");
    const servers = await getServers();
    if (servers === null) {
        console.log("No servers found, creating blank array");
        saveServers([])
    }
}

init();