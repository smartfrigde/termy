export function translateKey(key: string): string {
    switch (key) {
        case "Enter":
            return "\r";
        case "Backspace":
            return "\b";
        case "Tab":
            return "\t";
        case "Escape":
            return "\x1b";
        case "ArrowUp":
            return "\x1b[A";
        case "ArrowDown":
            return "\x1b[B";
        case "ArrowLeft":
            return "\x1b[D";
        case "ArrowRight":
            return "\x1b[C";
        case "Control":
            return "\x1b[5~";
        default:
            return key;
    }
}
export function translateCtrlCombo(key: string): string {
    const upperChar = key.toUpperCase();
    const code = upperChar.charCodeAt(0) - 64; // 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26
    const hex = code.toString(16).padStart(2, "0"); // 2-digit hex
    return `\\x${hex}`;
}
