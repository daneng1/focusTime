import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import Constants from 'expo-constants';

export default function App() {
  const [ focusSubject,setFocusSubject ] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? ( 
        <Text>Here is where the timer will go</Text> 
        ): ( 
          <Focus addSubject={setFocusSubject}/> 
        )}
        <Text>{focusSubject}</Text>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 100,
    alignItems: 'center',
    backgroundColor: '#252250' ,
  },
});
