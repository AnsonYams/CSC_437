import { define, Auth, Switch, History  } from "@calpoly/mustang";
import { TitleBannerElement } from "./components/titlebanner.ts";
import { CuisineElement } from "./components/cuisineItem.ts";
import { AllCuisinesElement } from "./components/allCuisines.ts";
import { SubBanner} from "./components/subBanner.ts";
import { html } from "lit";
import { HomeViewElement } from "./views/home-view.ts";
import { LoginFormElement } from "./auth/login-form.ts";
import { CuisineViewElement } from "./views/cuisine-view.ts";
import { AllRestaurantsElement } from "./components/restaurantListing.ts";
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
    path: "/",
    redirect: "/app"
  }
];

define({
    "title-banner": TitleBannerElement,
    "cuisine-item": CuisineElement,
    "all-cuisines": AllCuisinesElement,
    "sub-banner": SubBanner,
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "home-view": HomeViewElement,
    "login-form": LoginFormElement,
    "cuisine-view": CuisineViewElement,
    "all-restaurants": AllRestaurantsElement, 
    "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
        super(routes, "food:history", "food:auth");
    }
    },
});



SubBanner.initializeOnce();