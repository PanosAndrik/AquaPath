import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function CalendarScreen({ navigation }) {
  const [hydrationLogs] = useState([
    { day: 1, hydrated: true },
    { day: 2, hydrated: false },
    { day: 3, hydrated: true },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hydration Calendar</Text>
      <View style={styles.calendarContainer}>
        {hydrationLogs.map((log, index) => (
          <TouchableOpacity key={index} style={styles.dayButton}>
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
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
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
    margin: 10,
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
