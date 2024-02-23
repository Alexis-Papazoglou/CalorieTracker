import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DatesCalendar from "../../components/DatesCalendar";
import DayMealCardModal from "../../components/ReusableComponents/DayMealCardModal";

export default function Calendar() {
  return (
    <SafeAreaView style={styles.container}>
      <DayMealCardModal />
      <DatesCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
