import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function SignUpLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Sign Up Button */}
      <View style={styles.signupContainer}>
        <Button
          title="SIGN UP"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>

      {/* Instruction Text and Login Button */}
      <View style={styles.loginContainer}>
        <Text style={styles.text}>If you are already registered please:</Text>
        <Button
          title="LOGIN"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      {/* Image at the bottom */}
      <Image
        source={require('../assets/images/loginsignup.png')}
        style={styles.image}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Distribute content vertically
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa', // Light blue background
  },
  signupContainer: {
    marginTop: 50, // Move the Sign Up button higher
    width: 200,
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 20, // Create space between login button and image
    width: 200,
  },
  text: {
    marginBottom: 10, // Space between text and login button
    fontSize: 16,
    color: 'gray',
    textAlign: "center"
  },
  image: {
    width: 200, // Adjust based on your image size
    height: 100, // Adjust based on your image size
    resizeMode: 'contain',
    marginBottom: 20, // To keep the image at the bottom
  },
});
