import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayTasks = () => {
    return (
        <View style={styles.taskofHour}>
            <Text style={styles.hour}>12:00am</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    taskofHour: {
        marginTop: 10,
        marginLeft: 16,
    },
    hour: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '400',
    },
});

export default DayTasks;