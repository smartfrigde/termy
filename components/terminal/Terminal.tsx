import { ServerType } from '@/types/Server';
import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ThemedButton from '../ThemedButton';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import XTerm from './XTerm';

interface TerminalModalProps {
  server: ServerType;
  visible: boolean;
  setVisible: (e: boolean) => void;
}

export default function TerminalModal({ server, visible, setVisible }: TerminalModalProps) {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const disconnectSSH = () => {

  };

  const sendCommand = () => {
    setOutput(command);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText type="title">Terminal</ThemedText>
        <ThemedButton
            title="Close"
            onPress={() => {
              disconnectSSH();
              setVisible(false);
            }}
          />
        </ThemedView>
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <XTerm output={output} />
        </ScrollView>
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            placeholder="cmd"
            placeholderTextColor="gray"
            value={command}
            onChangeText={setCommand}
          />
          <ThemedButton title="Send" onPress={sendCommand} />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
  },
});