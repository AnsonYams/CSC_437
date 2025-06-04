import { define, Auth, Switch, History, Store  } from "@calpoly/mustang";
import { TitleBannerElement } from "./components/titlebanner.ts";
import { CuisineElement } from "./components/cuisineItem.ts";
import { AllCuisinesElement } from "./components/allCuisines.ts";
import { SubBanner} from "./components/subBanner.ts";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update.ts";
import { HomeViewElement } from "./views/home-view.ts";
import { LoginFormElement } from "./auth/login-form.ts";
import { CuisineViewElement } from "./views/cuisine-view.ts";
import { AllRestaurantsElement } from "./components/restaurantListing.ts";
import { RestaurantViewElement } from "./views/restaurant-view.ts";
import { FoodViewElement } from "./views/food-view.ts";
import { FoodEditViewElement } from "./views/food-edit-view.ts";
const routes = [
  {
    path: "/app/cuisine/:id",
    view: (params: Switch.Params) => html`
      <cuisine-view cuisine=${params.id}></cuisine-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/app/restaurant/:id",
    view: (params: Switch.Params) => html`
      <restaurant-view name=${params.id}></restaurant-view>`
  },
  {
    path: "/app/restaurant/:restaurant/food/:food",
    view: (params: Switch.Params) => html`
      <food-view name=${params.food} restaurant=${params.restaurant}></food-view>`
  },
  {
    path: "/app/restaurant/:restaurant/food/:food/edit",
    view: (params: Switch.Params) => html`
      <food-edit-view name=${params.food} restaurant=${params.restaurant}></food-edit-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
    "title-banner": TitleBannerElement,
    "cuisine-item": CuisineElement,
    "all-cuisines": AllCuisinesElement,
    "sub-banner": SubBanner,
    "home-view": HomeViewElement,
    "login-form": LoginFormElement,
    "cuisine-view": CuisineViewElement,
    "all-restaurants": AllRestaurantsElement, 
    "restaurant-view": RestaurantViewElement,
    "food-view": FoodViewElement,
    "food-edit-view": FoodEditViewElement,
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore
      extends Store.Provider<Model, Msg>
      {
        constructor() {
          super(update, init, "food:auth");
        }
      },
    "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
        super(routes, "food:history", "food:auth");
    }
    },
});



SubBanner.initializeOnce();