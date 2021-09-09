import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Vibration, Platform } from 'react-native';

import { Countdown } from '../../components/countdown';
import { ProgressBar, Colors } from 'react-native-paper';
import { RoundedButton } from '../../components/roundedButton';
import { Timing } from './Timing.js';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();

  const DEFAULT_TIME = .05;
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [completed, setCompleted] = useState(false);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    vibrate();
    setCompleted(true);
    onTimerEnd(minutes);
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    setProgress(1);
  };

  // TODO: vibrate not working
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval, 10000));
    } else {
      Vibration.vibrate(10000);
    }
  };

  const clearScreen = () => {
    setCompleted(false);
  }

  return (
    <View>
      {completed ? (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => clearScreen()}>
          <Text style={styles.completed}>Yay, you did it!!</Text>
        </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.countdown}>
            <Countdown
              minutes={minutes}
              isPaused={!isStarted}
              onProgress={onProgress}
              onEnd={onEnd}
            />
          </View>
          <View style={{ padding: spacing.xl }}>
            <Text style={styles.title}>Focusing on: </Text>
            <Text style={styles.task}>{focusSubject}</Text>
          </View>
          <View>
            <ProgressBar style={styles.progressBar} color={colors.black} progress={progress} />
          </View>
          <View style={styles.buttonWrapper}>
            <Timing onChangeTime={changeTime} />
          </View>
          <View style={styles.buttonWrapper}>
            {isStarted ? (
              <RoundedButton
                title="Pause"
                size={100}
                onPress={() => setIsStarted(false)}
              />
            ) : (
              <RoundedButton
                title="Start"
                size={100}
                onPress={() => setIsStarted(true)}
              />
            )}
          </View>
            <View style={styles.cleaSubject}>
              <RoundedButton
                title="Clear"
                size={50}
                onPress={() => clearSubject()}
              />
            </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.25,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    borderRadius: 10,
    height: 20,
    zIndex: -1,
    marginTop: spacing.md,
  },
  completed: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
