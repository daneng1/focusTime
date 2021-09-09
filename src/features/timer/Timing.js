import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/roundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={60} title="1" onPress={() => onChangeTime(1)} />
        <RoundedButton size={60} title="5" onPress={() => onChangeTime(5)} />
        <RoundedButton size={60} title="10" onPress={() => onChangeTime(10)} />
        <RoundedButton size={60} title="20" onPress={() => onChangeTime(20)} />
        <RoundedButton size={60} title="30" onPress={() => onChangeTime(30)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
