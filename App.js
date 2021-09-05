import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/timer';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} removeSubject={setFocusSubject} />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 100,
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
  },
});
