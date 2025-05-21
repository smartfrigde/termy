import { GenerateKeyModal } from "@/components/GenerateKeyModal";
import { KeyItem } from "@/components/KeyItem";
import { ThemedView } from "@/components/ThemedView";
import { selectKeys } from "@/core/slices/sshSlice";
import { Octicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
const screenWidth = Dimensions.get("window").width;
const numColumns = Math.floor(screenWidth / 200);

const KeychainScreen = () => {
    const [generateModalVisible, setGenerateModalVisible] = useState(false);
    const keys = useSelector(selectKeys);
    console.log("keys", keys);
    function createKey() {
        setGenerateModalVisible(true);
    }
    return (
        <ThemedView
            style={[
                styles.container,
                {
                    flexDirection: "row",
                },
            ]}
        >
            <Stack.Screen options={{ title: "Keychain" }} />
            <TouchableOpacity onPress={createKey} style={styles.floatingButton}>
                <Octicons name="key" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.serverListContainer}>
                <FlatList
                    data={keys}
                    numColumns={numColumns}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) => <KeyItem item={item} />}
                />
            </View>
            <GenerateKeyModal modalVisible={generateModalVisible} setModalVisible={setGenerateModalVisible} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serverListContainer: {
        flex: 1,
        padding: 10, // Adjust padding for the container
    },

    floatingButton: {
        zIndex: 1,
        backgroundColor: "#442a00",
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
});

export default KeychainScreen;
