export interface Settings {
    theme: "light" | "dark" | "system";
    fontSize: number;
    defaultShell: "native" | "universal";
    language: string;
    recentConnections: string[]; // array of SSHConnection ids
}
