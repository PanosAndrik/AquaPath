import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignUpLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Signup Section */}
      <View style={styles.signupContainer}>
        <Text style={styles.text}>Join us ASAP:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Login Section */}
      <View style={styles.loginContainer}>
        <Text style={styles.text}>If you are already registered, please:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // White background
  },
  signupContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  loginContainer: {
    alignItems: 'center',
    width: '100%',
  },
  text: {
    marginBottom: 10,
    fontSize: 22,
    color: 'red',
    textAlign: 'center',
    fontFamily: 'sans-serif-light', 
    fontStyle: 'italic',
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
    width: '35%', 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
