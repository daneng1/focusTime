import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/timer';
import { uuidv4 } from './src/utils/uuid';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([
    // {subject:"Finish app",status:1,minutes:0.05,key:"5e3fdedc-e495-45e7-8b34-f2c948152f88"},
    // {subject:"Complete tasks",status:2,minutes:0,key:"1b11dcaf-8835-4a60-91b6-1abb38045d5e"}
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const addFocusHistory = (subject, status, minutes) => {
    setFocusHistory([...focusHistory, { subject, status, minutes, key: uuidv4() }]);
  };

  const STATUS = {
    COMPLETE: 1,
    CANCELLED: 2,
  };

  useEffect(() => {
    const interval = setInterval(() => setIsLoading(false), 2000)
  }, [])

  return (
    <>
    {isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    ) : (null)}
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={(minutes) => {
            addFocusHistory(focusSubject, STATUS.COMPLETE, minutes);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistory(focusSubject, STATUS.CANCELLED, 0);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={styles.focusContainer}>
          <Focus
            addSubject={setFocusSubject}
            clearSubject={() => setFocusSubject(null)}
          />
            <FocusHistory 
              focusHistory={focusHistory}
              setFocusHistory={setFocusHistory}
            />
        </View>
      )}
    </SafeAreaView>
    </>
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
    flex: 0,
  },
  loader: {
    position: 'absolute',
    top: "50%",
    left: "50%",
    zIndex: 1
  }
});
