import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <><Stack.Screen options={{ headerShown: false }} /><Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
        }} />
      <Drawer.Screen
        name="teams"
        options={{
          drawerLabel: 'Teams',
          title: 'Teams',
        }} />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
        }} />
    </Drawer></>
  );
}
