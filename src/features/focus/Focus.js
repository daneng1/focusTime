import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/roundedButton';

export const Focus = ({ addSubject}) => {
  const [focusItem, setFocusItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What to focus on?</Text>
        <View style={styles.inputContainer}> 
          <TextInput 
          style={{ flex:1 }}
          maxLength={50}
          value={focusItem}
          onSubmitEditing={({ nativeEvent: {text} }) => setFocusItem(text)}
          />
          <RoundedButton 
          style={styles.addSubject}
          size={50} 
          title='+' 
          onPress={() => addSubject(focusItem)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  titleContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 40
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: 'row'
  },
  addSubject: {
    marginLeft: 20,
    alignSelf: 'center'
  }
});
