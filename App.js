import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react';
import { useState } from 'react';


export default function App() {
  const currentMonths = [
    {label: 'January 2026', value: '01'},
    {label: 'February 2026', value: '02'},
    {label: 'March 2026', value: '03'},
    {label: 'April 2026', value: '04'},
  ];
  
  const [currentmonthValue, setcurrentmonthValue] = React.useState(currentMonths[0].value);

  const profilePicturePressed = async () => {
    alert('Profile Picture pressed!');
  };


  return (
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
            setcurrentmonthValue(item.value)}}
          selectedTextStyle={styles.selectedTextStyle}
          renderItem={item => <Text style={styles.itemText}>{item.label}</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
    paddingHorizontal: 20,
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
    borderColor: '#7A5C3E',
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
