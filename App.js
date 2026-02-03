import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Weekdays from './components/weekdays';


export default function App() {
  
   {/*Grabs current month and next 3*/}
  const currentMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1 + i);
  
    return {
      label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      value: String(date.getMonth() + 1).padStart(2, '0'),
    };
  });

  const [baseDate, setBaseDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [currentmonthValue, setcurrentmonthValue] = useState(
    String(new Date().getMonth() + 1).padStart(2, '0')
  );
  const today = new Date();

  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  minDate.setDate(minDate.getDate() - 7);

  const maxDate = new Date(today.getFullYear(), today.getMonth() + 4, 1);
  maxDate.setDate(maxDate.getDate() + 6);

   {/*Grabs current week and then the weeksintoFuture is controller by the next arrow button
    When it is pressed, we look that many weeks into future
    useEffect is used with the weeksintoFuture dependency so everytime it's changed, we grab the next week as well*/}
  useEffect(() => {
    const startOfWeek = new Date(baseDate);
    const dayOfWeek = baseDate.getDay() === 0 ? 7 : baseDate.getDay();

    startOfWeek.setDate(baseDate.getDate() - dayOfWeek + 1);

    const week = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      return {
        day: date.toLocaleString('default', { weekday: 'short' }),
        value: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        selected: date.toDateString() === baseDate.toDateString(),
      };
    });

    setCurrentWeek(week); 
    setcurrentmonthValue(
      String(baseDate.getMonth() + 1).padStart(2, '0')
    );
  }, [baseDate]);

  {/*Need to use for function once accounts added*/}
  const profilePicturePressed = async () => {
    alert('Profile Picture pressed!');
  };

  {/*When a day is pressed, we just re-create the currentWeek array and assign the selected day to the day that was pressed
    This is used for the weekdays component*/}
  const onDayPress = (pressedDay) => {
    const selected = currentWeek.find(d => d.day === pressedDay);
    if (!selected) return;

    setBaseDate(
      new Date(selected.year, selected.month, selected.value)
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
              const newDate = new Date(baseDate);
              newDate.setMonth(parseInt(item.value) - 1);
              newDate.setDate(1);
              if (newDate >= minDate && newDate <= maxDate) {
                setBaseDate(newDate);
              }
            }}
            selectedTextStyle={styles.selectedTextStyle}
            renderItem={item => <Text style={styles.itemText}>{item.label}</Text>}
          />
        </View>
        {/*These buttons will need to changed to display correcrtly on devices with different screen sizes*/}
        <View style={styles.weekdaySelector}>
        {/*Can change to 0*/}
        <View style={styles.goBack}>
          <TouchableOpacity style={[styles.previousWeek, {marginLeft: -25, marginBottom:10}]}>
              <Text style={{textAlign: 'center', fontSize: 18, lineHeight: 22, color: '#000000'}}
               onPress={() => {
                const newDate = new Date(baseDate);
                newDate.setDate(1);
                if (newDate >= minDate) {
                  setBaseDate(newDate);
                }
              }}
              >‹‹</Text>
            </TouchableOpacity>
          <TouchableOpacity style={[styles.previousWeek, {marginLeft: -25, marginTop:55}]}>
              <Text style={{textAlign: 'center', fontSize: 18, lineHeight: 22, color: '#000000'}}
              onPress={() => {
                const newDate = new Date(baseDate);
                newDate.setDate(baseDate.getDate() - 7);
                if (newDate > minDate) {
                  setBaseDate(newDate);
                }
              }}
              >‹</Text>
            </TouchableOpacity>
          </View>
            {/*This is where the weekdays of the current week are passed. The onDayPress is also passed so it can call back here*/}
          <Weekdays 
            week={currentWeek}
            onDayPress={onDayPress}
          />
          <TouchableOpacity style={[styles.nextWeek, {marginLeft: 320}]}>
            <Text style={{textAlign: 'center', fontSize: 24, lineHeight: 38, color: '#000000'}}
            onPress={() => {
              const newDate = new Date(baseDate);
              newDate.setDate(baseDate.getDate() + 7);
              if (newDate <= maxDate) {
                setBaseDate(newDate);
              }
            }}
            >›</Text>
          </TouchableOpacity>
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
  weekdaySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextWeek: {
    position: 'absolute',
    marginTop: 20,
    width: 30,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#CBB08E',
    borderWidth: 2.5, 
  },
  goBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previousWeek: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#CBB08E',
    borderWidth: 2.5, 
  },
});
