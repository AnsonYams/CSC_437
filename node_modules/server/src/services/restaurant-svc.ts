import { Schema, model } from "mongoose";
import { Restaurant } from "../models/restaurant";

const restaurantSchema = new Schema<Restaurant>(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true },
    foods: [{ type: String, required: true }],
    image: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
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


function get(name: string): Promise<Restaurant> {
  return RestaurantModel.findOne({name}).then((doc) => {
    if (!doc) throw `Restaurant ${name} not found`;
    return doc;
  });
}


function create(data: Restaurant): Promise<Restaurant> {
  return RestaurantModel.create(data);
}

function update(name: string, data: Partial<Restaurant>): Promise<Restaurant> {
  return RestaurantModel.findOneAndUpdate({ name }, data, { new: true }).then((updated) => {
    if (!updated) throw `Restaurant ${name} not updated`;
    return updated;
  });
}


function remove(name: string): Promise<void> {
  return RestaurantModel.findOneAndDelete({ name }).then((deleted) => {
    if (!deleted) throw `Restaurant ${name} not deleted`;
  });
}

export default { index, get, create, update, remove, byCuisine };
