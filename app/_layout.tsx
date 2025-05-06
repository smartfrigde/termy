import { isLoggedIn } from '@/core/loginManager';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../core/init";

export function Stacks() {
  console.log('isLoggedIn', isLoggedIn);
  if (isLoggedIn) {
    return (
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stacks />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
