import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { CuisineElement } from "./cuisineItem.ts";
import { Auth, define, Observer } from "@calpoly/mustang";
interface CuisineItem{
    href: string;
    cuisine: string;
    icon: string;
}

export class AllCuisinesElement extends LitElement {
    static uses = define({
        "cuisine-item": CuisineElement
      })

    @property()
    src?: string;
  
    @state()
    cuisines: Array<CuisineItem> = [];
    
    render() {
        const { cuisines } = this;

        function renderCuisine(cuisine: CuisineItem) {
            return html`
                <cuisine-item
                    href=${cuisine.href}
                    cuisine=${cuisine.cuisine}
                    icon=${cuisine.icon}
                ></cuisine-item>
            `;
        }
      return html`
        ${cuisines.map(renderCuisine)}
      `;
    }

    _authObserver = new Observer<Auth.Model>(this, "food:auth");
    _user?: Auth.User;

    override connectedCallback() {
      super.connectedCallback();
      this._authObserver.observe((auth: Auth.Model) => {
        this._user = auth.user;

        if (this._user?.authenticated && this.src) {
          this.hydrate(this.src);
        }
      });
      console.log("User authenticated:", this._user);
      console.log("Hydrate triggered with src:", this.src);
    }

  get authorization(): { Authorization?: string } {
    if (this._user && this._user.authenticated)
      return {
        Authorization:
          `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    else return {};
  }

      hydrate(src: string) {
        console.log("Auth header:", this.authorization);
        fetch(src, {
          headers: {
            "Content-Type": "application/json",
            ...this.authorization
          }
        })
          .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch cuisines: ${res.status}`);
            return res.json();
          })
          .then((json: CuisineItem[]) => {
            this.cuisines = json;
          })
          .catch(err => {
            console.error("Error loading cuisines:", err);
          });
      }


  }