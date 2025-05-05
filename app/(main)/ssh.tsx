import TerminalView from '@/components/terminal/Terminal';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function TerminalScreen() {
  return (
    <SafeAreaView>
      <ThemedView>
        <TerminalView />
      </ThemedView>
      </SafeAreaView>
  );
}
