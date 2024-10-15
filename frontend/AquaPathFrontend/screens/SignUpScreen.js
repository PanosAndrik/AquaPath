import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    console.log('Name:', name);  
    console.log('Email:', email);  
    console.log('Password:', password);  

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('http://10.0.3.2:5000/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,  
          email,
          password,
        }),
      });

      const responseText = await response.text();
      console.log('Response:', responseText);

      if (!response.ok) {
        Alert.alert('Error', responseText);  
        return;
      }

      Alert.alert('Success', 'User created successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server');
      console.log('Network Error:', error);  
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get you all signed up!</Text>
      <TextInput
        placeholder="Name" 
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Custom Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red', 
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#1E90FF', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '40%', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
