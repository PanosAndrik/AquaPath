import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function MainScreen() {
  const [pyramidFill, setPyramidFill] = useState(0);

  const handleAddWater = () => {
    if (pyramidFill < 100) {
      setPyramidFill(pyramidFill + 10); 
    }
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.calendarContainer}>
        <Text>Calendar</Text>
      </View>

      {}
      <Text style={styles.fillText}>{pyramidFill}% Filled</Text>

      {}
      <View style={styles.pyramidContainer}>
        <Image
          source={require('../assets/images/pyramid.png')}
          style={styles.pyramid}
        />
        <View style={[styles.fillOverlay, { height: `${pyramidFill}%` }]} />
      </View>

      {/* Custom "+" Button */}
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
    left: 20,
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
    fontStyle: "italic",
    top: 80,
    fontWeight: 'bold'
  }
});
