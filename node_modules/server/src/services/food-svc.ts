import { Schema, model } from "mongoose";
import { Food } from "../models/food";

const foodSchema = new Schema<Food>(
  {
    food_name: { type: String, required: true, trim: true },
    ingredients: [{ type: String, required: true }],
    pic: { type: String, required: true, trim: true },
    macros: {
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true }
    }
  },
  { collection: "Foods" }
);

// Mongoose model
const FoodModel = model<Food>("Foods", foodSchema);

// Service methods

function index(): Promise<Food[]> {
  return FoodModel.find();
}

function get(id: string): Promise<Food> {
  return FoodModel.findOne({food_name:id}).then((doc) => {
    if (!doc) throw `Food ${id} not found`;
    return doc as Food;
  });
}

function create(data: Food): Promise<Food> {
  const f = new FoodModel(data);
  return f.save();
}

function update(
  food_name: String,
  food: Food
): Promise<Food> {
  return FoodModel.findOneAndUpdate({ food_name }, food, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${food_name} not updated`;
    else return updated as Food;
  });
}

function remove(food_name: String): Promise<void> {
  return FoodModel.findOneAndDelete({ food_name }).then(
    (deleted) => {
      if (!deleted) throw `${food_name} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };
