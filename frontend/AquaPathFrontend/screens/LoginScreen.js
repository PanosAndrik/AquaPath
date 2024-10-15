import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.3.2:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
      console.log('Login response:', data);
  
      if (response.ok) {
        // Store the token
        await AsyncStorage.setItem('token', data.token);
        console.log('Token stored successfully');
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server');
      console.log('Network Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Welcome Back Text */}
      <Text style={styles.title}>Welcome!</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Styled Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',  
  },
  title: {
    fontSize: 28,  
    color: 'red',  
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',  
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#1E90FF',  
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
