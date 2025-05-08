'use dom';
import { Terminal } from '@xterm/xterm';
import { useEffect } from 'react';
interface TerminalModalProps {
  name: string;
  hostname: string;
  port: number;
  password: string;
  login: string;
  visible: boolean;
}
export default function TerminalModal({ name, hostname, port, password, login, visible}: TerminalModalProps) {
  useEffect(() => {
    const term = new Terminal();
    const terminalElement = document.getElementById('terminal');
    if (terminalElement) {
      term.open(terminalElement);
      term.write('Hello from \x1B[1;3;31mterminal\x1B[0m $ ');
    }
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return <div id="terminal"></div>;
}