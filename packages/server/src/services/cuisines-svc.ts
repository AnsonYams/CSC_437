import {Schema, model} from 'mongoose';
import {CuisineItem} from '../models/cuisines';

const cuisineSchema = new Schema<CuisineItem>({
    href: {type: String, required: true},
    cuisine: {type: String, required: true},
    icon: {type: String, required: true}
}, {collection: 'Cuisines'});

const CuisineModel = model<CuisineItem>('Cuisines', cuisineSchema);

function index(): Promise<CuisineItem[]> {
  return CuisineModel.find();
}

function get(cuisine: String): Promise<CuisineItem> {
  return CuisineModel.find({ cuisine })
    .then((list) => list[0])
    .catch((err) => {
      throw `${cuisine} Not Found`;
    });
}

export default { index, get };