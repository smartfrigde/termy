"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "./Xterm.css";

interface XTermProps {
    output: string;
    dom: import('expo/dom').DOMProps;
}

export default function XTerm({ output }: XTermProps) {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const term = useRef<Terminal | null>(null);
    useEffect(() => {
        if (!terminalRef.current) return;

        if (!term.current) {
            term.current = new Terminal();
            term.current.open(terminalRef.current);
        }

        if (term.current) {
            term.current.write(output);
        }
    }, [output]);

    return <div id="terminal" ref={terminalRef} />;
}
