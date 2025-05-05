import SSHClient from '@dylankenneally/react-native-ssh-sftp';
import React from 'react';
import { ThemedText } from '../ThemedText';

const TerminalView: React.FC = () => {
    async function sshTest() {
        let host = 'your host here'; // example: '123.321.123.321';
        let user = 'your user name here'; // example: 'root';
        let password = 'your password here'; // example: 'password123!';
      
        let _log = 'about to connect to ' + host + ' as ' + user;
        let log = (s: any) => { console.log(s); _log += '\n' + s; };
      
        try {
          // @ts-ignore - the last parameter is optional
          let client = await SSHClient.connectWithPassword(host, 22, user, password);
          log('connected');
          log(JSON.stringify(client, null, 2));
      
          let command = 'uptime';
          log(`about to execute '${command}'`);
      
          let output = await client.execute(command);
          log('done, result is:');
          log(output);
      
          log('about to disconnect');
          client.disconnect();
          log('disconnected');
        } catch (err) {
          log('error');
          log(err);
        } finally {
          return _log;
        }
      }
      sshTest();
  return (
    <ThemedText>
        Hello World!
    </ThemedText>
  );
};
