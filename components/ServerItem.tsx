import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { removeServer } from '@/core/slices/sshSlice';
import { deleteServer } from '@/core/sshManager';
import { ServerType } from '@/types/Server';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
export const ServerItem = ({ item }: { item: ServerType }) => {
    const dispatch = useDispatch();
    const [editVisible, setVisible] = useState(false);
    const onHoverIn = () => {
      setVisible(true);
    };
    const onHoverOut = () => {
      setVisible(false);
    };
    const handlePress = () => {
      alert(JSON.stringify(item));
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

      <Pressable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
        <ThemedView style={styles.serverItem}>
          <TouchableOpacity style={styles.connectButton} onPress={handlePress}>
            <Octicons name="link" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText type="title">{item.name}</ThemedText>
          {editVisible && (
            <TouchableOpacity style={styles.editButton} onPress={handleDelete}>
              <Octicons name="trash" size={24} color="white" />
            </TouchableOpacity>
          )}
        </ThemedView>
  
      </Pressable>
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
  