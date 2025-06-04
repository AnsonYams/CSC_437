export type Msg = 
    | ["cuisines/load"]
    | ["restaurant/load", {restaurant: string}]
    | ['food/load', {food_name: string}];