import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { removeServer } from '@/core/slices/sshSlice';
import { deleteServer } from '@/core/sshManager';
import { ServerType } from '@/types/Server';
import { Octicons } from '@expo/vector-icons';
import { ContextMenuContent, ContextMenuItem } from '@radix-ui/react-context-menu';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { EditServerModal } from './EditServerModal';
import TerminalModal from './terminal/Terminal.native';
import { ContextMenuItemIcon, ContextMenuItemTitle, ContextMenuRoot, ContextMenuTrigger } from './ui/ContextMenu';
export const ServerItem = ({ item }: { item: ServerType }) => {
  const [terminalModalVisible, setTerminalModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
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
  const handleEdit = () => {
    setEditModalVisible(true);
  }
  return (
    <>
    <ContextMenuRoot>
      <ContextMenuTrigger style={{ flex: 1, height: "100%", width: "100%" }}>
        <ThemedView style={styles.serverItem}>
          <TouchableOpacity style={styles.connectButton} onPress={connect}>
            <Octicons name="link" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText type="title">{item.name}</ThemedText>
        </ThemedView>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ flex: 1, height: "100%", width: "100%", backgroundColor: "#121212", borderRadius: 20, padding: 10 }}>
        <ContextMenuItem key="edit" onSelect={handleEdit}>
          <ContextMenuItemTitle>Edit</ContextMenuItemTitle>
          <ContextMenuItemIcon ios="pencil">
            <Octicons name="pencil" size={24} color="white" />
          </ContextMenuItemIcon>
        </ContextMenuItem>
        <ContextMenuItem key="delete" onSelect={handleDelete}>
          <ContextMenuItemTitle>Delete</ContextMenuItemTitle>
          <ContextMenuItemIcon ios="trash">
            <Octicons name="trash" size={24} color="white" />
          </ContextMenuItemIcon>
        </ContextMenuItem>
      </ContextMenuContent>

    </ContextMenuRoot>
    <TerminalModal server={item} visible={terminalModalVisible} setVisible={setTerminalModalVisible} />
    <EditServerModal item={item} setModalVisible={setEditModalVisible} modalVisible={editModalVisible} />
    </>
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
