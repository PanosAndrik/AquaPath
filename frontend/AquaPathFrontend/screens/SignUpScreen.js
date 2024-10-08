import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    console.log('Name:', name);  // Log name - debug
    console.log('Email:', email);  // Log email - debug
    console.log('Password:', password);  // Log password - debug

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
        Alert.alert('Error', responseText);  // Show error message debug
        return;
      }

      Alert.alert('Success', 'User created successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server');
      console.log('Network Error:', error);  // Log network error
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
});
