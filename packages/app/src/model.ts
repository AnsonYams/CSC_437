import { Cuisine, Restaurant, Food } from "server/models";

export interface Model {
  cuisines?: Cuisine[];
  restaurant?: Restaurant;
  food?: Food;
}

export const init: Model = {};