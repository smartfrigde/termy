'use client';
import { Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import './Xterm.css';

interface XTermProps {
    output: string;
}

export default function XTerm({ output }: XTermProps) {
    const terminalRef = useRef<HTMLDivElement | null>(null); // Reference to the terminal DOM element
    const term = useRef<Terminal | null>(null); // Reference to the Terminal instance

    useEffect(() => {
        if (!terminalRef.current) return;

        // Initialize the terminal only once
        if (!term.current) {
            term.current = new Terminal();
            term.current.open(terminalRef.current);
        }

        // Write output to the terminal
        if (term.current) {
            term.current.write(output);
        }
    }, [output]); // Re-run effect when output changes

    return <div id="terminal" ref={terminalRef}></div>;
}