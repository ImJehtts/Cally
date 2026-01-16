import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react';
import { useState } from 'react';
import Weekdays from './components/weekdays';


export default function App() {
  const currentMonths = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
  
    return {
      label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      value: String(date.getMonth() + 1).padStart(2, '0'),
    };
  });


  const [currentWeek, setCurrentWeek] = useState(() => {
    const currentDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i - date.getDay() + 1); 
  
      return {
        day: date.toLocaleString('default', { weekday: 'short' }),
        value: date.getDate(),
        selected: i === new Date().getDay() - 1, 
      };
    });
    return currentDays; 
  });
  
  const [currentmonthValue, setcurrentmonthValue] = useState(currentMonths[0].value);

  const profilePicturePressed = async () => {
    alert('Profile Picture pressed!');
  };

  const onDayPress = (pressedDay) => {
    setCurrentWeek(prev =>
      prev.map(item => ({
        ...item,
        selected: item.day === pressedDay,
      }))
    );
  };



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Orario</Text>
          <TouchableOpacity style={styles.profilePicture} 
            onPress={profilePicturePressed}>
          </TouchableOpacity>
        </View>
        <View style={styles.monthSelector}>
          <Dropdown
            style={styles.monthDropdown}
            data={currentMonths}
            labelField="label"
            valueField="value"
            value={currentmonthValue}
            onChange={item => {
              setcurrentmonthValue(item.value);
            }}
            selectedTextStyle={styles.selectedTextStyle}
            renderItem={item => <Text style={styles.itemText}>{item.label}</Text>}
          />
        </View>
        <View style={styles.weekdaySelector}>
          <Weekdays 
          week={currentWeek}
          onDayPress={onDayPress}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
    paddingHorizontal: 30,
  },
  header: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '500',  
    fontFamily: 'DMSerifDisplay-Regular-Italic',
    color: '#000000',
  },
  profilePicture: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    borderColor: '#7A5C3E',
    borderWidth: 2.5, 
  },
  monthSelector: {
    marginTop: 10,
    alignItems: 'center',
  },
  monthDropdown: {
    height: 50,
    width: '65%',
    borderColor: '#CBB08E',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  selectedTextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  itemText: {
    padding: 7,
    fontSize: 18,
    textAlign : 'center',
  },
});
