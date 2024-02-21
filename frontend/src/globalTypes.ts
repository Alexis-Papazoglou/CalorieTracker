export interface FoodItem {
  food: string;
  weight: number;
  calories: number;
  fat: number;
  protein: number;
}

export interface Meal {
  food?: string; // case backend returns : {food: "no items"}
  general_title: string; // created on backend
  date?: number; // created on frontend
  imageUrl?: string; // created on frontend
  totalMealCalories?: number; // created on frontend
  food_items: FoodItem[]; // created on backend
}
export interface User {
  bodyInfo: {
    age: number;
    bodyType: string;
    gender: string;
    goal: string;
    height: number;
    trainingActivity: string;
    weight: number;
  };
  dailyCalories: number;
  email: string;
  uid: string;
  username: string;
  userMeals?: Meal[]; // subcollection
}