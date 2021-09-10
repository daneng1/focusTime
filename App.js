import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator, 
  Animated
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
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const addFocusHistory = (subject, status, minutes) => {
    setFocusHistory([...focusHistory, { subject, status, minutes, key: uuidv4() }]);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  const STATUS = {
    COMPLETE: 1,
    CANCELLED: 2,
  };

  useEffect(() => {
    fadeIn();
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
