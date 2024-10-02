import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.title}>Welcome to AquaPath!</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>The app that helps you stay hydrated</Text>
      
      {/* Image */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      
      {/* Button */}
      <Button
        title="Let's go!"
        onPress={() => navigation.navigate('SignUpLogin')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16, 
    color: 'gray',
    marginBottom: 30,
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 30,
  },
});
