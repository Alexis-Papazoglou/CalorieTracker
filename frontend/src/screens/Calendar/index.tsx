import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DatesCalendar from "../../components/DatesCalendar";

export default function Calendar() {
  return (
    <SafeAreaView>
      <DatesCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
