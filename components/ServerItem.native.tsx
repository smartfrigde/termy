import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { removeServer } from '@/core/slices/sshSlice';
import { deleteServer } from '@/core/sshManager';
import { ServerType } from '@/types/Server';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ContextMenu from "react-native-context-menu-view";
import { useDispatch } from 'react-redux';
import TerminalModal from './terminal/Terminal.native';
export const ServerItem = ({ item }: { item: ServerType }) => {
    const [terminalModalVisible, setTerminalModalVisible] = useState(false);
    const dispatch = useDispatch();

    const connect = () => {
      setTerminalModalVisible(true);
      console.log('Connecting to server', item);
    };
    const handleDelete = () => {
      deleteServer(item.id!).then((response) => {
        if (response.status === 200) {
          console.log('Server deleted', item);
          dispatch(removeServer(item.id!));
        }
      })
    };
    return (
      <ContextMenu
        title={item.name}
        actions={[{ title: "Edit", systemIcon: "pencil" }, { title: "Remove", systemIcon: "trash" }]}
        onPress={(e) => {
          console.warn(
            `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
          );
          if (e.nativeEvent.index === 1) {
            handleDelete();
          }
        }}
      >
        <ThemedView style={styles.serverItem}>
          <TouchableOpacity style={styles.connectButton} onPress={connect}>
            <Octicons name="link" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText type="title">{item.name}</ThemedText>
        </ThemedView>
        <TerminalModal server={item} visible={terminalModalVisible} setVisible={setTerminalModalVisible}></TerminalModal>
      </ContextMenu>
    );
  };
  
  const styles = StyleSheet.create({
    serverItem: {
      flex: 1, // Allow items to stretch and fill available space
      minWidth: '45%', // Ensure a minimum width for each item
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#121212',
      borderRadius: 20,
      margin: 5, // Add margin between items
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    serverListContainer: {
      flex: 1,
      padding: 10, // Adjust padding for the container
    },
  
    floatingButton: {
      zIndex: 1,
      backgroundColor: "#007AFF",
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 40,
      right: 30,
      elevation: 5, // For Android shadow
      shadowColor: "#000", // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  
    connectButton: {
      backgroundColor: "#2e272d",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      width: 60,
      height: 60,
      borderRadius: 30,
    },
  
    editButton: {
      backgroundColor: "#272c2e",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
      width: 60,
      height: 60,
      borderRadius: 10,
    }
  });
  