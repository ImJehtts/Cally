import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Weekdays from './components/weekdays';
import Daytasks from './components/daytasks';


export default function App() {
  
  //Grabs previous month, current month and next 4
  const currentMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1 + i);
  
    return {
      label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      value: String(date.getMonth() + 1).padStart(2, '0'),
    };
  });
 
  //Base date is the date we are currently looking at
  const [baseDate, setBaseDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [currentmonthValue, setcurrentmonthValue] = useState(
    String(new Date().getMonth() + 1).padStart(2, '0')
  );
  const today = new Date();

  //The earliest date a user can go into. Max previous week from 1st of current month
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  minDate.setDate(minDate.getDate() - 7);

  //The furthest date a user can go into. Max next week into last of current quarter of months
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 4, 1);
  maxDate.setDate(maxDate.getDate() + 6);

  useEffect(() => {

    //Start at week of selected day
    const startOfWeek = new Date(baseDate);
    //Treats Sunday like day 7 so Monday is Day 1
    const dayOfWeek = baseDate.getDay() === 0 ? 7 : baseDate.getDay();

    //Move to Monday of current week
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

  //Need to use for function once accounts added
  const profilePicturePressed = async () => {
    alert('Profile Picture pressed!');
  };

  //When a weekday is tapped, update the selected date
  const onDayPress = (pressedDay) => {
    //currentWeek is the week being displayed so we just find the day that was pressed
    const selected = currentWeek.find(d => d.day === pressedDay);
    if (!selected) return;

    /*When a weekday is tapped, update the selected date. This explains the logic of how we move weeks/months. 
    The current date is treated as the "baseDate" and all changes are made based on that.*/
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
              //item.value is month in MM format so we set the month accordingly to the selected month in the dropdown
              newDate.setMonth(parseInt(item.value) - 1);
              //This if statement is used to see if we are selecting first month in dropdown, which only contains it's last week
              if (item.value === currentMonths[0].value) {
                //Format is: new Date(year, monthIndex, 0) with 0 meaning last day of previous month
                const lastDayOfMonth = new Date(newDate.getFullYear(), parseInt(item.value), 0);
                // Jump to the last allowed date of that month
                newDate.setDate(Math.max(lastDayOfMonth.getDate(), minDate.getDate()));
              } else {
                //Set date to 1st of month
                newDate.setDate(1);
              }
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
        <ScrollView style={styles.scheduleScroll}>
          <Text style={styles.todayHeader}>Today's Schedule</Text>
          <Daytasks/>
        </ScrollView>
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
  todayHeader: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '350',
    color: '#7A5C3E',
  },
  scheduleScroll: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
});
