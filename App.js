import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/timer';
import { uuidv4 } from './src/utils/uuid';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistory = (subject, status, minutes) => {
    setFocusHistory([...focusHistory, { subject, status, minutes }]);
  };

  const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2,
  };
  console.log(focusHistory);
  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={(minutes) => {
            addFocusHistory(focusSubject, STATUSES.COMPLETE, minutes);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistory(focusSubject, STATUSES.CANCELLED, 0);
            setFocusSubject(null);
          }}
          removeSubject={setFocusSubject}
        />
      ) : (
        <View style={styles.focusContainer}>
          <Focus
            addSubject={setFocusSubject}
            clearSubject={() => setFocusSubject(null)}
          />
          <FocusHistory />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
  },
  focusContainer: {
    flex: 1,
    
  }
});
