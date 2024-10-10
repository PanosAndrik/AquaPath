import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function CalendarScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});

  const fetchHydrationStatus = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Session Expired', 'Please log in again.');
        navigation.navigate('Login');
        return;
      }

      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const response = await fetch(`http://10.0.3.2:5000/api/hydration-status?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hydration status');
      }

      const logs = await response.json();
      const newMarkedDates = {};
      
      logs.forEach(log => {
        const date = new Date(log.date).toISOString().split('T')[0];
        newMarkedDates[date] = {
          marked: true,
          dotColor: log.hydrated ? 'green' : 'red'
        };
      });

      // Highlight today's date
      const todayString = today.toISOString().split('T')[0];
      newMarkedDates[todayString] = {
        ...newMarkedDates[todayString],
        selected: true,
        selectedColor: 'blue'
      };

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error('Error fetching hydration status:', error);
      Alert.alert('Error', 'Failed to fetch hydration status. Please try again.');
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchHydrationStatus();
    }, [fetchHydrationStatus])
  );

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        theme={{
          todayTextColor: 'blue',
          selectedDayBackgroundColor: 'blue',
          selectedDayTextColor: 'white',
        }}
      />
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: 'green' }]} />
          <Text>Hydrated</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: 'red' }]} />
          <Text>Not Hydrated</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: 'blue' }]} />
          <Text>Today</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});