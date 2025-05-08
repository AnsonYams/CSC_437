import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { CuisineElement } from "./cuisineItem.ts";
import { define } from "@calpoly/mustang";
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
    
    hydrate(src: string) {
        fetch(src)
          .then(res => res.json())
          .then((json: CuisineItem[]) => {
            this.cuisines = json;
          });
      }

    connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }
  }

