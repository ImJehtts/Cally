import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect } from 'react';
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

  const [weeksintoFuture, setweeksintoFuture] = useState(0);
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    const currentDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i - date.getDay() + (1+(weeksintoFuture*7))); 
  
      return {
        day: date.toLocaleString('default', {weekday: 'short'}),
        value: date.getDate(),
        selected: i === new Date().getDay() - 1 && weeksintoFuture === 0,      
      };
    });
    setCurrentWeek(currentDays); 
  }, [weeksintoFuture]);
  
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
        {/*These buttons will need to changed to display correcrtly on devices with different screen sizes*/}
        <View style={styles.weekdaySelector}>
        {/*Can change to 0*/}
        <View style={styles.goBack}>
          <TouchableOpacity style={[styles.previousWeek, {marginLeft: -25, marginBottom:10}]}>
              <Text style={{textAlign: 'center', fontSize: 18, lineHeight: 22, color: '#000000'}}
              onPress={() => setweeksintoFuture(0)}
              disabled={weeksintoFuture === 0}
              >‹‹</Text>
            </TouchableOpacity>
          <TouchableOpacity style={[styles.previousWeek, {marginLeft: -25, marginTop:55}]}>
              <Text style={{textAlign: 'center', fontSize: 18, lineHeight: 22, color: '#000000'}}
              onPress={() => setweeksintoFuture(weeksintoFuture - 1)}
              disabled={weeksintoFuture === -1}
              >‹</Text>
            </TouchableOpacity>
          </View>
          <Weekdays 
            week={currentWeek}
            onDayPress={onDayPress}
          />
          <TouchableOpacity style={[styles.nextWeek, {marginLeft: 320}]}>
            <Text style={{textAlign: 'center', fontSize: 24, lineHeight: 38, color: '#000000'}}
            onPress={() => setweeksintoFuture(weeksintoFuture + 1)}
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
