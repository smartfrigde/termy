import { Hero } from '@/components/Hero';
import { ServerItem } from '@/components/ServerItem';
import { ServerModal } from '@/components/ServerModal';
import { ThemedView } from '@/components/ThemedView';
import { selectServers, setServers } from '@/core/slices/sshSlice';
import { getServers } from '@/core/sshManager';
import { Octicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const screenWidth = Dimensions.get('window').width;
const numColumns = Math.floor(screenWidth / 200);


export default function DashboardScreen() {
  const servers = useSelector(selectServers);
  const dispatch = useDispatch();
  const [serverModalVisible, setServerModalVisible] = useState(false);
  const createServer = () => {
    setServerModalVisible(true);
  };
  const refresh = () => { 
    getServers().then((servers) => {
      console.log(servers);
      dispatch(setServers(servers.ssh_connections));
    });
  }
  useEffect(() => {
    refresh();
  }, []);
  
  return (
    <ThemedView style={{ flex: 1 }}>
      <ServerModal setModalVisible={setServerModalVisible} modalVisible={serverModalVisible} refresh={refresh}></ServerModal>
      <Hero />
      <TouchableOpacity onPress={createServer} style={styles.floatingButton}>
        <Octicons name="plus" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.serverListContainer}>

        <FlatList
          data={servers}
          numColumns={numColumns}
          keyExtractor={item => item.id!}
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

