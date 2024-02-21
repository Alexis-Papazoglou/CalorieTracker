export interface FoodItem {
  food: string;
  weight: number;
  calories: number;
  fat: number;
  protein: number;
  quantity?: number;
}

export interface Meal {
  general_title: string;
  date: string;
  imageUrl?: string;
  food_items: FoodItem[];
}
