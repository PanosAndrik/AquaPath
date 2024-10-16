import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function MainScreen() {
  const [pyramidFill, setPyramidFill] = useState(0);
  const navigation = useNavigation();

  
  useEffect(() => {
    const loadPyramidFill = async () => {
      const savedFill = await AsyncStorage.getItem('pyramidFill');
      if (savedFill !== null) {
        setPyramidFill(parseInt(savedFill));
      }
    };
    loadPyramidFill();

    
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hydration Reminder',
          body: 'Please have a glass of water!',
        },
        trigger: {
          seconds: 10800,
          repeats: true,
        },
      });
    };
    scheduleNotification();
  }, []);

 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

 
  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('pyramidFill');
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignUpLogin' }],
        });
      }},
    ]);
  };

  
  const handleAddWater = async () => {
    if (pyramidFill < 100) {
      const newFill = pyramidFill + 10;
      setPyramidFill(newFill);
      await AsyncStorage.setItem('pyramidFill', newFill.toString());

      if (newFill === 100) {
        Alert.alert('Congratulations!', 'You are hydrated for the day!');
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            Alert.alert('Session Expired', 'Please log in again.');
            navigation.navigate('Login');
            return;
          }

          const response = await fetch('http://10.0.3.2:5000/api/update-hydration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              date: new Date().toISOString(),
              isHydrated: true
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update hydration status');
          }

          setPyramidFill(0);
          await AsyncStorage.setItem('pyramidFill', '0');
        } catch (error) {
          console.error('Error updating hydration status:', error);
          Alert.alert('Error', 'Failed to update hydration status. Please try again.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.calendarContainer}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Image
          source={require('../assets/images/calendar.png')}
          style={styles.calendarImage}
        />
        <Text style={styles.calendarText}>Calendar</Text>
      </TouchableOpacity>

      <Text style={styles.fillText}>{pyramidFill}% Filled</Text>

      <View style={styles.pyramidContainer}>
        <Image
          source={require('../assets/images/pyramid.png')}
          style={styles.pyramid}
        />
        <View style={[styles.fillOverlay, { height: `${pyramidFill}%` }]} />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddWater}>
        <Image
          source={require('../assets/images/plusicon.png')}
          style={styles.addButtonImage}
        />
      </TouchableOpacity>
      <Text style={styles.addGlass}>Add a glass of water</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',  
  },
  calendarImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  calendarText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  pyramidContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  pyramid: {
    width: 200,
    height: 200,
    position: 'absolute',
    resizeMode: 'contain',
  },
  fillOverlay: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    bottom: 0,
    zIndex: -1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  fillText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addGlass: {
    fontStyle: 'italic',
    top: 10,
    fontWeight: 'bold',
  },
  logoutText: {
    marginRight: 10,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
