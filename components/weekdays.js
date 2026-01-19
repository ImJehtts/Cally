import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Weekdays = ({week, onDayPress}) => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.weekdayContainer}>
              {/*Each day of the week is rendered individually using mapping*/}
            {week.map((item) => (
                <TouchableOpacity 
                key = {item.day}
                onPress={() => onDayPress(item.day)}
                style={[styles.weekday, {backgroundColor: item.selected ? "#9B7A55" : '#FFFFFF'}, {borderColor: item.selected ? "#9B7A55" : '#CBB08E'}]}>
                <Text         
                    style={{
                        lineHeight: 18,
                        color: item.selected ? '#FFFFFF' : '#000000', 
                    }}
                >{item.day}</Text>
                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 32,
                        color: item.selected ? '#FFFFFF' : '#000000',
                    }}
                >{item.value}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </ScrollView>
    );
};

export default Weekdays;

const styles = StyleSheet.create({
    weekdayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 20,
    },
    weekday:{
        height: 70,
        width: '15%',
        borderWidth: 2,
        borderRadius: 25,
        marginHorizontal: 2,
        textAlign: 'center',
        justifyContent: 'center', 
        alignItems: 'center',
    }
});



