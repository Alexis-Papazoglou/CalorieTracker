import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Meal } from '../../globalTypes';

const dummyData: Meal[] = [
    {
        title: "Breakfast",
        date: "2022-01-01",
        items: [
            { food: "Eggs", calories: 155, weight: 50, quantity: 2 },
            { food: "Bacon", calories: 42, weight: 10, quantity: 3 },
        ],
    },
    {
        title: "Lunch",
        date: "2022-01-01",
        items: [
            { food: "Burger", calories: 250, weight: 100, quantity: 1 },
            { food: "Fries", calories: 365, weight: 100, quantity: 1 },
        ],
    },
    {
        title: "Dinner",
        date: "2022-01-01",
        items: [
            { food: "Steak", calories: 679, weight: 200, quantity: 1 },
            { food: "Mashed Potatoes", calories: 214, weight: 200, quantity: 2 },
        ],
    },
];

const DatesCalendar = () => {
    const [mealsData, setMealsData] = useState<Meal[]>(dummyData);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDayPress = (date: any) => {
        setSelectedDate(date.dateString);
    };

    const mealsForSelectedDate = mealsData.filter(meal => meal.date === selectedDate);

    return (
        <ScrollView>
            <Calendar
                current={'2022-01-01'}
                style={{
                    borderColor: 'gray',
                    gap: 10,
                }}

                dayComponent={({ date, state }) => {
                    const isSelectedDate = date?.dateString === selectedDate;
                    return (
                        <TouchableOpacity
                            style={{
                                ...styles.date,
                                backgroundColor: isSelectedDate ? 'lightblue' : 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => handleDayPress(date)}
                        >
                            <View>
                                <Text
                                    style={{
                                        color: state === 'disabled' ? 'lightgray' : 'black'
                                    }}>
                                    {date?.day}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            {selectedDate && (
                <View>
                    <Text>Meals for {selectedDate}:</Text>
                    {mealsForSelectedDate.map((meal, index) => (
                        <View key={index}>
                            <Text>{meal.title}</Text>
                            {meal.items.map((item, index) => (
                                <Text key={index}>{item.food}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = {
    date: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default DatesCalendar;
