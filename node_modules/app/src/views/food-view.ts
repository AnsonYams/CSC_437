import { html, css } from "lit";
import { View } from "@calpoly/mustang";
import { property, state } from "lit/decorators.js";
import { Model } from "../model";
import { Msg } from "../messages";
import { Food } from "server/models";
import reset from "../styles/reset.css.ts";

export class FoodViewElement extends View<Model, Msg> {
  @property({ type: String })
  name = "";

@property({type: String})
    restaurant= "" 

  constructor() {
    super("food:model");
  }

  @state()
  get food(): Food | undefined {
    return this.model.food;
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "name" && newVal && newVal !== oldVal) {
      this.dispatchMessage(["food/load", { food_name: newVal }]);
    }
  }

render() {
  const f = this.food;
  if (!f) return html`<p>Loading food info...</p>`;

  return html`
    <title-banner title="${f.food_name}"></title-banner>
    <sub-banner subheader="← Back" src="/app/restaurant/${this.restaurant}"></sub-banner>
    <section class="food-detail">
    <a class="edit-btn" href="/app/restaurant/${this.restaurant}/food/${f.food_name}/edit">
        ✏️ Edit
        </a>
      <h2>${f.food_name}</h2>
      <img src="${f.pic}" alt="${f.food_name}" />
      <div class="section">
        <h3>Ingredients</h3>
        <ul class="ingredients">
          ${f.ingredients.map(i => html`<li>${i}</li>`)}
        </ul>
      </div>
      <div class="section macros">
        <h3>Macronutrients</h3>
        <div class="macro-grid">
          <div><strong>Calories:</strong> ${f.macros.calories}</div>
          <div><strong>Protein:</strong> ${f.macros.protein}g</div>
          <div><strong>Carbs:</strong> ${f.macros.carbs}g</div>
          <div><strong>Fat:</strong> ${f.macros.fat}g</div>
        </div>
      </div>
    </section>
  `;
}

static styles = 
[reset.styles,
    css`
  :host {
    display: block;
    font-family: var(--font-family-text);
    background-color: var(--color-background-page);
    color: var(--color-text);
  }

  .food-detail {
    background-color: var(--color-background-card);
    border-radius: var(--margin-medium);
    padding: var(--padding-med);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: var(--margin-big) auto;
  }

  h2 {
    font-size: var(--font-size-header);
    font-family: var(--font-family-header);
    font-weight: var(--font-weight-header);
    color: var(--color-background-header-text);
    text-align: center;
    margin-bottom: var(--margin-medium);
  }

  img {
    display: block;
    width: 80%;
    max-height: 400px;
    object-fit: cover;
    margin: 0 auto var(--margin-medium);
    border-radius: var(--margin-medium);
  }

  .section {
    margin-bottom: var(--margin-big);
  }

  h3 {
    font-size: var(--font-size-subheader);
    font-weight: var(--font-weight-subheader);
    margin-bottom: var(--margin-small);
    color: var(--color-text);
  }

  .ingredients {
    list-style: none;
    padding-left: var(--padding-small);
    font-size: var(--font-size-text);
  }

  .ingredients li::before {
    content: "🥕 ";
    margin-right: 0.5em;
  }

  .macro-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--margin-small);
  }

  .macro-grid div {
    background-color: var(--color-restaurant-card);
    padding: var(--padding-small);
    border-radius: var(--margin-small);
    text-align: center;
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-subheader);
    color: var(--color-background-header-text);
  }
.edit-btn {
  display: inline-block;
  margin-bottom: var(--margin-medium);
  padding: var(--padding-small) var(--padding-med);
  background-color: var(--color-link);
  color: var(--color-background-page);
  text-decoration: none;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-subheader);
  border-radius: var(--margin-small);
}

.edit-btn:hover {
  background-color: var(--color-background-header-text);
  color: var(--color-text);
}


`];


}
