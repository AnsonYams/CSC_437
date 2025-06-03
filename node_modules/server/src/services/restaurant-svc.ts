import { Schema, model } from "mongoose";
import { Restaurant } from "../models/restaurant";

const restaurantSchema = new Schema<Restaurant>(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true },
    foods: [{ type: String, required: true }]
  },
  { collection: "Restaurants" }
);

const RestaurantModel = model<Restaurant>("Restaurants", restaurantSchema);

function index(): Promise<Restaurant[]> {
  return RestaurantModel.find();
}

function byCuisine(cuisineName: string): Promise<Restaurant[]> {
    const c = cuisineName.split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .trim();  
    console.log(c)
  return RestaurantModel.find({ cuisine: c });
}


function get(id: string): Promise<Restaurant> {
  return RestaurantModel.findById(id).then((doc) => {
    if (!doc) throw `Restaurant ${id} not found`;
    return doc;
  });
}


function create(data: Restaurant): Promise<Restaurant> {
  return RestaurantModel.create(data);
}


function update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
  return RestaurantModel.findByIdAndUpdate(id, data, { new: true }).then((updated) => {
    if (!updated) throw `Restaurant ${id} not updated`;
    return updated;
  });
}

function remove(id: string): Promise<void> {
  return RestaurantModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `Restaurant ${id} not deleted`;
  });
}

export default { index, get, create, update, remove, byCuisine };
