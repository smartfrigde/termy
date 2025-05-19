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
        default:
            return key;
    }
}
