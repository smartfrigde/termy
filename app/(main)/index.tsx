import { FlatList, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Hero } from '@/components/Hero';
import { ServerModal } from '@/components/ServerModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { selectServers } from '@/core/slices/sshSlice';
import { ServerType } from '@/types/Server';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const numColumns = Math.floor(screenWidth / 200);

const ServerItem = ({ item }: { item: ServerType }) => {
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
  return (
    <Pressable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
      <ThemedView style={styles.serverItem}>
        <TouchableOpacity style={styles.connectButton} onPress={handlePress}>
          <Octicons name="link" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText type="title">{item.name}</ThemedText>
        {editVisible && (
          <TouchableOpacity style={styles.editButton} onPress={handlePress}>
            <Octicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        )}
      </ThemedView>

    </Pressable>
  );
};

export default function DashboardScreen() {
  const servers = useSelector(selectServers);
  const [serverModalVisible, setServerModalVisible] = useState(false);

  const createServer = () => {
    setServerModalVisible(true);
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      
      <ServerModal setModalVisible={setServerModalVisible} modalVisible={serverModalVisible}></ServerModal>
      <Hero />
      <TouchableOpacity onPress={createServer} style={styles.floatingButton}>
        <Octicons name="plus" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.serverListContainer}>

        <FlatList
          data={servers}
          numColumns={numColumns}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ServerItem item={item} />}
        />
      </View>
    </ThemedView>
  );
}

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

