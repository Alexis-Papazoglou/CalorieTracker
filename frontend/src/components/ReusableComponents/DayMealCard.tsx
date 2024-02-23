import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { formatDate } from "../../utils";
import { Meal } from "../../globalTypes";
import { primaryShadow } from "../../constants/shadows";
// import useOpenDayMealCardModal from "../../../hooks/useOpenDayMealCardModal";

interface MealCardProps {
  meal: Meal;
}

const DayMealCard: React.FC<MealCardProps> = ({ meal }) => {
  // const { toggleModal } = useOpenDayMealCardModal(meal);
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(meal.date)}</Text>
      <TouchableOpacity style={styles.contentContainer}>
        <ImageBackground source={{ uri: meal.imageUrl }} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.text}>{meal.general_title}</Text>
            <Text style={styles.text}>{meal.totalMealCalories} Kcal</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "40%",
    height: 180,
  },
  date: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#5C5C5C",
    marginBottom: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...primaryShadow,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 3,
    backgroundColor: "white",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
});

export default DayMealCard;
