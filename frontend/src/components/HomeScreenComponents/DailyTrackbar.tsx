import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { primaryShadow, secondaryShadow } from "../../constants/shadows";
import LottieView from 'lottie-react-native';

interface props {
  dailyCalories: number;
  totalCalories: number;
}

export default function DailyTrackbar({ dailyCalories, totalCalories }: props) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Daily Track</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textView}>
          <View>
            <Text style={styles.trackText}>You are on track today!</Text>
            <Text style={styles.calorieText}>
              Consumed: {totalCalories} / {dailyCalories} kcal
            </Text>
          </View>
          <View>
            <LottieView
              source={require("../../../assets/likeanime.json")}
              style={{ width: 55, height: 55 , marginBottom: 5}}
              autoPlay
              speed={0.2}
            />
          </View>
        </View>
        <View style={styles.outerBar}>
          <View
            style={{
              ...styles.innerBar,
              width: `${(totalCalories / dailyCalories) * 100}%`,
            }}
          ></View>
          <Text
            style={{
              position: "absolute",
              right: 5,
              top: 2.5,
              color: "white",
              fontWeight: "700",
            }}
          >
            {Math.floor((totalCalories / dailyCalories) * 100)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    ...secondaryShadow,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  textView: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "right",
    color: "#5C5C5C",
    marginRight: 5,
    ...secondaryShadow,
  },
  calorieText: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
    color: "#5C5C5C",
  },
  trackText: {
    alignSelf: "flex-start",
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 8,
    color: "#5C5C5C",
  },
  outerBar: {
    width: "102%",
    height: 22,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 5,
    ...secondaryShadow,
  },
  innerBar: {
    height: 12,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
