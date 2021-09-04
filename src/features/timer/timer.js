import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Countdown } from '../../components/countdown';
import { RoundedButton } from '../../components/roundedButton'

import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';

export const Timer = ({ focusSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <View style={styles.container}>
    <View style={styles.countdown}>
      <Countdown isPaused={!isStarted}/>
    </View>
      <View style={{ padding: spacing.xl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.buttonWrapper}>
      {isStarted ? (
      <RoundedButton title='Pause' size={100} onPress={() => setIsStarted(false)}/> ):(
      <RoundedButton title='Start' size={100} onPress={() => setIsStarted(true)}/> 
      )}
      </View>
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
    justifyContent: "center",
    alignItems: "center",
  }
});
