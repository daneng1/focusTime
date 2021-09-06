import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/roundedButton';


import { fontSizes, spacing } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [focusItem, setFocusItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="input text here"
            style={{ flex: 1 }}
            maxLength={50}
            value={focusItem}
            onSubmitEditing={({ nativeEvent: { text } }) => setFocusItem(text)}
          />
          <RoundedButton
            style={styles.addSubject}
            size={50}
            title="+"
            onPress={() => addSubject(focusItem)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    // flex: .5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    // padding: spacing.md,
    fontSize: fontSizes.xxl,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
  },
  addSubject: {
    marginLeft: spacing.md,
    alignSelf: 'center',
  },
});
