import { Schema, model } from "mongoose";
import { Food } from "../models/food";

const foodSchema = new Schema<Food>(
  {
    food_name: { type: String, required: true, trim: true },
    ingredients: [{ type: String, required: true }],
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
  return FoodModel.findById(id).then((doc) => {
    if (!doc) throw `Food ${id} not found`;
    return doc as Food;
  });
}

function create(data: Food): Promise<Food> {
  const f = new FoodModel(data);
  return f.save();
}

function update(id: string, data: Partial<Food>): Promise<Food> {
  return FoodModel.findByIdAndUpdate(id, data, { new: true }).then((updated) => {
    if (!updated) throw `Food ${id} not updated`;
    return updated as Food;
  });
}

function remove(id: string): Promise<void> {
  return FoodModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `Food ${id} not deleted`;
  });
}

export default { index, get, create, update, remove };
