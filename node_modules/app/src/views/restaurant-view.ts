import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { View } from "@calpoly/mustang";
import { Model } from "../model";         // Adjust path as needed
import { Msg } from "../messages";        // Adjust path as needed
import reset from "../styles/reset.css.ts";
import { Restaurant } from "server/models";

export class RestaurantViewElement extends View<Model, Msg> {
  @property()
  name: string = ""; // from route param

  constructor() {
    super("food:model"); // or whatever your store key is
  }

  // Extract restaurant from the model
  @state()
  get restaurant(): Restaurant | undefined {
    return this.model.restaurant;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "name" && newValue && newValue !== oldValue) {
      this.dispatchMessage(["restaurant/load", { restaurant: newValue }]);
    }
  }

  render() {
    const r = this.restaurant;
    if (!r) return html`<p>Loading restaurant info...</p>`;

    return html`
      <title-banner title="${r.name}"></title-banner>
      <sub-banner subheader="← Back" src="/app/cuisine/${r.cuisine}"></sub-banner>
      <section class="restaurant-detail">
        <img src="${r.image}" alt="${r.name}" />
        <p><strong>Cuisine:</strong> ${r.cuisine}</p>
        <p><strong>Location:</strong> ${r.location}</p>
        <p><strong>Description:</strong> ${r.description}</p>
        <p><strong>Menu:</strong></p>
        <ul>
          ${r.foods.map((food) => html`
            <li>
              <a href="/app/restaurant/${r.name}/food/${food}">${food}</a>
            </li>
            `)}
        </ul>
      </section>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
        font-family: var(--font-family-text);
        background-color: var(--color-background-page);
        color: var(--color-text);
      }

      .restaurant-detail {
        margin-top: var(--margin-big);
        background: var(--color-restaurant-card);
        border-radius: var(--margin-medium);
        padding: var(--padding-med);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      img {
        width: 80%;
        max-height: 500px;
        object-fit: cover;
        border-radius: var(--margin-medium);
        margin-bottom: var(--margin-medium);
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      p {
        font-size: var(--font-size-text);
        margin-bottom: var(--margin-small);
      }

      ul {
        list-style: none;
        padding-left: var(--padding-med);
      }

      li::before {
        content: "🍽️ ";
        margin-right: var(--padding-small);
      }
    `
  ];
}
