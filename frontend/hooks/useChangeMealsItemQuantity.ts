import { useState } from "react";

export function useMeal(initialMeal: Meal, itemIndex: number) {
  const [meal, setMeal] = useState(initialMeal);

  const incrementQuantity = () => {
    setMeal((prevMeal) => {
      const newFoodItems = prevMeal.food_items.map((foodItem, i) => {
        if (i === itemIndex) {
          return { ...foodItem, quantity: (foodItem.quantity || 1) + 1 };
        }
        return foodItem;
      });

      return {
        ...prevMeal,
        food_items: newFoodItems,
      };
    });
  };

  const decrementQuantity = () => {
    setMeal((prevMeal) => {
      const newFoodItems = prevMeal.food_items.map((foodItem, i) => {
        if (i === itemIndex && foodItem.quantity && foodItem.quantity > 1) {
          return { ...foodItem, quantity: foodItem.quantity - 1 };
        }
        return foodItem;
      });

      return {
        ...prevMeal,
        food_items: newFoodItems,
      };
    });
  };

  return { meal, incrementQuantity, decrementQuantity };
}
