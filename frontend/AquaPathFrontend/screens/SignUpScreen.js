import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');  // Add name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    console.log('Name:', name);  // Log name for debugging
    console.log('Email:', email);  // Log email for debugging
    console.log('Password:', password);  // Log password for debugging

    try {
      const response = await fetch('http://10.0.3.2:5000/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,  // Include name in the request body
          email,
          password,
        }),
      });

      const responseText = await response.text();
      console.log('Response:', responseText);

      if (!response.ok) {
        Alert.alert('Error', responseText);  // Show error message
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
        placeholder="Name"  // Input for name
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
