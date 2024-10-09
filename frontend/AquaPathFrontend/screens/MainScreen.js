import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const [pyramidFill, setPyramidFill] = useState(0);
  const navigation = useNavigation();

  // Log out handler
  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => {
          // Clear session or token here if needed
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpLogin' }],
          });
      }},
    ]);
  };

  
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

  const handleAddWater = () => {
    if (pyramidFill < 100) {
      const newFill = pyramidFill + 10;
      setPyramidFill(newFill);

      if (newFill === 100) {
        Alert.alert('Congratulations!', 'You are hydrated for the day!');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Calendar Button */}
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
  },
  calendarImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  calendarText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
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
    top: 50,
    fontWeight: 'bold',
  },
  logoutText: {
    marginRight: 10,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
