import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';

export default function CalendarScreen({ route }) {
  const [hydrationLogs, setHydrationLogs] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  
  const daysInMonth = moment([selectedYear, selectedMonth]).daysInMonth();
  const firstDayOfMonth = moment([selectedYear, selectedMonth]).startOf('month').day();
  
  // Sample hydration logs
  const sampleHydrationLogs = {
    '2023-10-01': { hydrated: true },
    '2023-10-03': { hydrated: false },
    '2023-10-15': { hydrated: true },
  };

  useEffect(() => {
    // For simplicity, we use sample logs. You will replace this with real logs from your database.
    setHydrationLogs(sampleHydrationLogs);
  }, []);

  // Function to handle when a user taps a day
  const handleDayPress = (day) => {
    const date = moment([selectedYear, selectedMonth]).date(day).format('YYYY-MM-DD');
    const log = hydrationLogs[date];

    if (log) {
      Alert.alert(`Day ${day}`, log.hydrated ? 'You were hydrated' : 'Needs more water');
    } else {
      Alert.alert(`Day ${day}`, 'No data available');
    }
  };

  const handlePrevMonth = () => {
    const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayBox} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment([selectedYear, selectedMonth]).date(day).format('YYYY-MM-DD');
      const log = hydrationLogs[date];
      const isHydrated = log ? log.hydrated : null;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayBox,
            isHydrated === true ? styles.hydrated : isHydrated === false ? styles.notHydrated : null,
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hydration Calendar</Text>
      
      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.navButton}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {moment([selectedYear, selectedMonth]).format('MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navButton}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Days of the Week */}
      <View style={styles.daysOfWeek}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
        ))}
      </View>

      {/* Days of the Month */}
      <View style={styles.calendarGrid}>
        {renderDays()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  navButton: {
    fontSize: 18,
    color: '#007BFF',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayOfWeekText: {
    fontSize: 16,
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
  },
  hydrated: {
    backgroundColor: 'green',
  },
  notHydrated: {
    backgroundColor: 'red',
  },
});
