import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <Button
        title="Hydrate"
        onPress={() => {
          // Handle hydration logic (pyramid filling)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
