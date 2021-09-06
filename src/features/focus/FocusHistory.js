import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
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
        {!!focusHistory.length && (
          <>
          <FlatList
            style={{ width: "100%", height: "100%", paddingTop: 16 }}
            contentContainerStyle={{ alignItems: "center" }}
            data={focusHistory}
            renderItem={({ item, index }) => (
              <Text style={styles.historyItem(item.status)}>
                {item.subject} - {item.minutes} min
              </Text>
            )}
          />
          <RoundedButton size={75} title="Clear" onPress={() => clearHistory()}/>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: .5,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.xl,
    color: colors.white,
    marginTop: -100,
  },
  historyItem:(status) => ({
    color: status === 1 ? 'green' : 'red',
    fontSize: fontSizes.lg,
  })
})