import { store } from "@/core/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import React from 'react';

import { EchoListener } from "@/components/EchoListener"; // nowy komponent (poniżej)

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <BottomSheetModalProvider>
                        <EchoListener />
                        <Stack>
                            <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
                            <Stack.Screen name="(main)" options={{ headerShown: false }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                        <StatusBar style="auto" />
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </ThemeProvider>
        </Provider>
    );
}