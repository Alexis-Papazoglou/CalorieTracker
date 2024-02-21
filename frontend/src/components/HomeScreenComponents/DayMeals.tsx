import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Meal } from "../../globalTypes";

interface TodayMealsProps {
  meals: Meal[];
  date: string;
}

export default function DayMeals({ date,meals }: TodayMealsProps) {
  return (
    <View style={styles.container}>
      <Text>Meals for {date}</Text>
      {meals.map((meal, index) => (
        <View key={index} style={styles.meal}>
          <Text>{meal.general_title}</Text>
          <Text>{meal.totalMealCalories} Calories</Text>
          <Image
            source={{ uri: meal.imageUrl }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  meal: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1,
  },
});
