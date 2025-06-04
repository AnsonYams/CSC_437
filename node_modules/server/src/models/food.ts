export interface Food {
  food_name: string;
  ingredients: string[];
  pic: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
