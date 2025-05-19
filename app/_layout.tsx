import { store } from "@/core/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { getEcho } from '@/scripts/echo';
import { selectUser } from "@/core/slices/authSlice";
export default function RootLayout() {

    const user = useSelector(selectUser)

    useEffect(() => {
        if (user?.id) {
            getEcho().then((echo) => {
                echo
                    .private(`sync.user.${user.id}`)
                    .listen('.sync.nots', (event: any) => {
                        console.log('📩 Odebrano wiadomość:', event);
                    });
            });
        }
    }, []);

    const colorScheme = useColorScheme();
    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <GestureHandlerRootView>
                    <BottomSheetModalProvider>
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
