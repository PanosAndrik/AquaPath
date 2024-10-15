import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.title}>Welcome to AquaPath!</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>The app that helps you stay hydrated</Text>
      
      {/* Image */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      
      {/* Custom Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpLogin')}>
        <Text style={styles.buttonText}>LET'S GO!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f9fc', 
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'sans-serif-medium', 
  },
  subtitle: {
    fontSize: 18, 
    color: 'red',
    marginBottom: 40,
    fontFamily: 'sans-serif-light', 
  },
  logo: {
    width: 250,  
    height: 200, 
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1e90ff', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, 
  },
  buttonText: {
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
  },
});
