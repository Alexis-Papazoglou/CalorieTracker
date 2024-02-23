import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { Meal } from "../../globalTypes";
import useFetchMealsOfDay from "../../../hooks/useFetchMealsOfDay";
import { getDate } from "../../utils";
import { hardShadow, primaryShadow, secondaryShadow } from "../../constants/shadows";
import DayMealCard from "./DayMealCard";

interface TodayMealsProps {
  date: string;
  appearedMealsNumber: number | undefined;
}

export default function DayMealsContainer({ date, appearedMealsNumber }: TodayMealsProps) {
  // If the component is used to display recent meals, fetch today's and yesterday's meals
  // Otherwise, fetch the meals of the specified date
  // THIS IS IMPLEMENTED THIS WAY FOR REUSABILITY
  let mealsData: Meal[] = [];
  if (date === "recent") {
    const today = getDate("today");
    const yesterday = getDate("yesterday");
    const { meals: todayMealsData } = useFetchMealsOfDay(today);
    const { meals: yesterdayMealsData } = useFetchMealsOfDay(yesterday);
    mealsData = [...todayMealsData, ...yesterdayMealsData];
  } else {
    const { meals } = useFetchMealsOfDay(date);
    mealsData = meals;
  }

  return (
    <View style={styles.container}>
      {date === "recent" && <Text style={styles.headerText}>Recent Meals</Text>}
      <View style={styles.contentContainer}>
        {mealsData.length > 0 &&
          mealsData
            .sort((a, b) => Number(b.date) - Number(a.date))
            .map((meal, index) => <DayMealCard key={index} meal={meal} />)}
        {mealsData.length === 0 && <Text style={styles.noMealsText}>No meals found!</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "right",
    color: "#5C5C5C",
    marginRight: 5,
    ...secondaryShadow,
  },
  noMealsText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#5C5C5C",
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    ...hardShadow,
    padding: 5,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
