import { Food } from "server/models";

export type Msg = 
    | ["cuisines/load"]
    | ["restaurant/load", {restaurant: string}]
    | ['food/load', {food_name: string}]
    | ['food/save', 
        {
        originalName: string;
        food: Food;
        macros: object;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ];