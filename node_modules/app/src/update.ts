import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Cuisine, Restaurant, Food } from "server/models";


export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
case "cuisines/load":
  loadCuisines(user).then((cuisines) =>
    apply((model) => ({
      ...model,
      cuisine: cuisines[0],     }))
  );
  break;
case "restaurant/load":
  loadRestaurant(message[1].restaurant, user).then((restaurant) =>
    apply((model) => ({
      ...model,
      restaurant
    }))
  );
  break;
  case "food/load":
    loadFood(message[1].food_name, user).then(food =>
      apply(model => ({ ...model, food }))
    );
  break;
  case "food/save":
    saveFood(message[1], user)
      .then((food) =>
        apply((model) => ({ ...model, food }))
      )
      .then(() => {
        const { onSuccess } = message[1];
        if (onSuccess) onSuccess();
      })
      .catch((error: Error) => {
        const { onFailure } = message[1];
        if (onFailure) onFailure(error);
      });
    break;
    default:
      const unhandled: never = message[0]; // <-- never type
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}

function loadCuisines(user: Auth.User): Promise<Cuisine[]> {
  return fetch("/api/cuisines", {
    headers: Auth.headers(user),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch cuisines: ${res.status}`);
      return res.json();
    })
    .then((json: unknown) => json as Cuisine[]);
}

function loadRestaurant(name: string, user: Auth.User): Promise<Restaurant> {
  return fetch(`/api/restaurants/${name}`, {
    headers: Auth.headers(user),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch restaurant: ${res.status}`);
      return res.json();
    })
    .then((json: unknown) => json as Restaurant);
}

function loadFood(name: string, user: Auth.User): Promise<Food> {
  return fetch(`/api/foods/${name}`, {
    headers: Auth.headers(user)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to load food.");
      return res.json();
    })
    .then((json: unknown) => json as Food);
}

function saveFood(
  msg: {
    originalName: string;
    food: Food;
    macros: object;
  },
  user: Auth.User
) {
  const foodWithUpdatedMacros: Food = {
    ...msg.food,
    macros: msg.macros as Food["macros"]
  };

  return fetch(`/api/foods/${msg.originalName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(foodWithUpdatedMacros)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(
        `Failed to save profile for ${foodWithUpdatedMacros.food_name}`
      );
    })
    .then((json: unknown) => {
      if (json) return json as Food;
      return undefined;
    });
}