import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function CalendarScreen({ navigation }) {
  const [hydrationLogs] = useState([
    { day: 1, month: 'October', hydrated: true },
    { day: 2, month: 'October', hydrated: false },
    { day: 3, month: 'October', hydrated: true },

  ]);

  const handleDayPress = (log) => {
    if (log.hydrated) {
      Alert.alert(`Day ${log.day}`, `You were fully hydrated on this day!`);
    } else {
      Alert.alert(`Day ${log.day}`, `You could have some more water!`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hydration Calendar</Text>
      <Text style={styles.subtitle}>October</Text> 
      <View style={styles.calendarContainer}>
        {hydrationLogs.map((log, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayButton}
            onPress={() => handleDayPress(log)} 
          >
            <Text style={[styles.dayText, log.hydrated && styles.hydratedDay]}>
              {log.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 20,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
  dayButton: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
  },
  hydratedDay: {
    fontWeight: 'bold',
    color: 'green',
  },
});
