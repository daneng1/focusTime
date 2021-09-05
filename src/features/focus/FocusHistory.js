import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Flatlist,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import {  RoundedButton  } from '../../components/roundedButton';

export const FocusHistory = ({ focusHistory, setFocusHistory }) => {
  
  const clearHistory = () => {
    setFocusHistory([]);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Focus History</Text>
      </SafeAreaView>
    </>
  )
}

const styles=StyleSheet.create({
  container: {
    // flex: .5,
    alignItems: 'center',
    // marginTop: spacing.lg
  },
  title: {
    fontSize: fontSizes.lg,
    color: colors.white
  }
})