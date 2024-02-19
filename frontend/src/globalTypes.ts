export interface FoodItem {
    food: string;
    calories: number;
    weight: number;
    quantity: number;
}

export interface Meal {
    title: string;
    date: string;
    food_items: FoodItem[];
}
