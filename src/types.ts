export interface Food {
  id: string;
  category: string;
  icon: string;
  name: string;
  netCarbs: number;
  fat: number;
  protein: number;
  calories: number;
}

export interface MealEntry {
  id: string;
  food: Food;
  grams: number;
  calculatedNutrition: {
    netCarbs: number;
    fat: number;
    protein: number;
    calories: number;
  };
  timestamp: Date;
}

export interface DailyTotals {
  netCarbs: number;
  fat: number;
  protein: number;
  calories: number;
}

export interface Recipe {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: {
    foodId: string;
    grams: number;
  }[];
  instructions: string[];
  totalNutrition: {
    netCarbs: number;
    fat: number;
    protein: number;
    calories: number;
  };
  servings: number;
}