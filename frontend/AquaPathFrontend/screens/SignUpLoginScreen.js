import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function SignUpLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {}
      <View style={styles.signupContainer}>
        <Button
          title="SIGN UP"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>

      {}
      <View style={styles.loginContainer}>
        <Text style={styles.text}>If you are already registered please:</Text>
        <Button
          title="LOGIN"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      {}
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
    backgroundColor: '#e0f7fa', 
  },
  signupContainer: {
    marginTop: 50, 
    width: 200,
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: "center"
  },
  image: {
    width: 200, 
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 20, 
  },
});
