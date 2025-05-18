import {Schema, model} from 'mongoose';
import {Cuisine} from '../models/cuisine';

const cuisineSchema = new Schema<Cuisine>({
    cuisine: {type: String, required: true, trim: true},
    href: {type: String, required: true, trim: true},
    icon: {type: String, required: true, trim: true}
}, {collection: 'Cuisines'});

const CuisineModel = model<Cuisine>('Cuisines', cuisineSchema);

function index(): Promise<Cuisine[]> {
  return CuisineModel.find();
}

function get(c: String): Promise<Cuisine> {
  const cuisine = c
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .trim();  
  return CuisineModel.find({ cuisine })
    .then((list) => list[0])
    .catch((err) => {
      throw `${cuisine} Not Found`;
    });
}

function create(json: Cuisine): Promise<Cuisine> {
  const c = new CuisineModel(json);
  return c.save();
}

function update(
  cuisine: String,
  cuisineItem: Cuisine
): Promise<Cuisine> {
  return CuisineModel.findOneAndUpdate({ cuisine }, cuisineItem, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${cuisine} not updated`;
    else return updated as Cuisine;
  });
}

function remove(cuisine: String): Promise<void> {
  return CuisineModel.findOneAndDelete({ cuisine }).then(
    (deleted) => {
      if (!deleted) throw `${cuisine} not deleted`;
    }
  );
}


export default { index, get, create, update, remove};