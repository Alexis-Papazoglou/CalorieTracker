import React from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { FoodItem, Meal } from "../../globalTypes";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { secondaryShadow } from "../../constants/shadows";

interface FoodItemComponentProps {
  item: FoodItem;
  index: number;
  setAnalysis: React.Dispatch<React.SetStateAction<Meal | null>>;
}

const FoodItemComponent: React.FC<FoodItemComponentProps> = ({
  item,
  index,
  setAnalysis,
}) => {
  function handleChange(arg0: string, text: string): void {
    setAnalysis((prevState: Meal | null) => {
      if (prevState) {
        const newFoodItems = prevState.food_items.map(
          (foodItem: FoodItem, i: number) => {
            if (i === index) {
              return { ...foodItem, [arg0]: text ? parseFloat(text) : 0 };
            }
            return foodItem;
          }
        );

        return { ...prevState, food_items: newFoodItems };
      }
      return null;
    });
  }

  function handleQuantityChange(delta: number): void {
    if (item.quantity + delta < 1) {
      Alert.alert("Delete item", "Are you sure you want to delete this item?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAnalysis((prevState: Meal | null) => {
              if (prevState) {
                const newFoodItems = prevState.food_items.filter(
                  (_, i) => i !== index
                );
                return { ...prevState, food_items: newFoodItems };
              }
              return null;
            });
          },
        },
      ]);
    } else {
      handleChange("quantity", (item.quantity + delta).toString());
      handleChange(
        "multipliedCalories",
        (item.calories * (item.quantity + delta)).toString()
      );
    }
  }

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={styles.details}>
          <Text style={styles.foodTitle}>
            {item.food.charAt(0).toUpperCase() + item.food.slice(1)}
          </Text>
          <Text style={styles.value}>Weight: {item.weight}</Text>
          <Text style={styles.value}>Protein: {item.protein}</Text>
          <Text style={styles.value}>Fat: {item.fat}</Text>
        </View>
        <View style={styles.controls}>
          <View>
            <View style={styles.quantityChanger}>
              <TouchableOpacity
                style={[styles.changeCalBtn, styles.dcBtn]}
                onPress={() => handleQuantityChange(-1)}
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.value,
                  { fontWeight: "700", textAlign: "center" },
                ]}
              >
                {item.quantity}
              </Text>
              <TouchableOpacity
                style={[styles.changeCalBtn, styles.incBtn]}
                onPress={() => handleQuantityChange(1)}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.calorieInput}>
              <Text
                style={[
                  styles.value,
                  { fontWeight: "500", textAlign: "center" },
                ]}
              >
                kcal:
              </Text>
              <TextInput
                style={styles.calInput}
                onChangeText={(text) => handleChange("calories", text)}
                value={item.calories.toString()}
                placeholder="Calories"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    flex: 1,
  },
  controls: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  quantityChanger: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    borderWidth: 1,
    borderColor: "lightgray",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  value: {
    fontSize: 16,
    textAlign: "left",
  },
  calInput: {
    height: 30,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 70,
    textAlign: "center",
    ...secondaryShadow,
    color: colors.secondary,
    alignSelf: "center",
  },
  detailsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  changeCalBtn: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
    ...secondaryShadow,
    borderWidth: 1,
    borderColor: "grey",
  },
  incBtn: {
    backgroundColor: colors.tertiary,
  },
  dcBtn: {
    backgroundColor: "white",
  },
  calorieInput: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default FoodItemComponent;
