import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { define, Form, View, History } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { Food } from "server/models";
import reset from "../styles/reset.css.ts";

export class FoodEditViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property()
  name = "";

  @property()
  restaurant = "";

  constructor() {
    super("food:model");
  }

  @state()
  get food(): Food | undefined {
    return this.model.food;
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "name" && newVal && newVal !== oldVal && this.restaurant) {
      this.dispatchMessage(["food/load", { food_name: newVal }]);
    }
  }

  render() {
    return html`
      <main class="page">
        <title-banner title="${this.name ? `Edit ${this.name}` : "Add New Food"}"></title-banner>
        <sub-banner subheader="← Back" src="/app/restaurant/${this.restaurant}/food/${this.name}"></sub-banner>
        <h2>${this.name ? `Edit ${this.name}` : "Add New Food"}</h2>
        <mu-form
          .init=${this.food || {
            food_name: "",
            pic: "",
            ingredients: [],
            macros: {
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0
            }
          }}
          @mu-form:submit=${this.handleSubmit}
        >
          <label>
            Food Name:
            <input name="food_name" required />
          </label>
        <label>
                Picture URL:
                <input name="pic" type="url" />
          <label>
            Ingredients (comma-separated):
            <input name="ingredients" type="text" />
          </label>

          <fieldset>
            <legend>Macronutrients</legend>
            <label>Calories: <input type="number" name="macros.calories" required /></label>
            <label>Protein (g): <input type="number" name="macros.protein" required /></label>
            <label>Carbs (g): <input type="number" name="macros.carbs" required /></label>
            <label>Fat (g): <input type="number" name="macros.fat" required /></label>
          </fieldset>
        </mu-form>
      </main>
    `;
  }

    handleSubmit(event: Form.SubmitEvent<Food>) {
    const raw = event.detail;

    // Convert ingredients string to array (if it came as a string)
    const food: Food = {
        ...raw,
        ingredients: typeof raw.ingredients === "string"
        ? raw.ingredients.split(",").map((i: string) => i.trim())
        : raw.ingredients
    };

    this.dispatchMessage([
        "food/save",
        {
        originalName: this.name,
        food,
        onSuccess: () =>
            History.dispatch(this, "history/navigate", {
            href: `/app/restaurant/${this.restaurant}/food/${food.food_name}`,
            }),
        onFailure: (error: Error) => console.error("ERROR:", error)
        }
    ]);
    }

  static styles =[ reset.styles,
  css`
  :host {
    display: block;
    font-family: var(--font-family-text);
    background-color: var(--color-background-page);
    color: var(--color-text);
  }

  h2 {
    font-size: var(--font-size-header);
    color: var(--color-background-header-text);
    margin-bottom: var(--margin-medium);
    text-align: center;
  }

  mu-form {
    display: flex;
    flex-direction: column;
    gap: var(--margin-medium);
    background: var(--color-background-card);
    padding: var(--padding-med);
    border-radius: var(--margin-medium);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size-text);
    gap: var(--margin-small);
  }

  input {
    padding: var(--padding-small);
    font-size: var(--font-size-small);
    border-radius: var(--margin-small);
    border: 1px solid #ccc;
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--margin-small);
  }

  fieldset label {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  fieldset input {
    flex: 1;
    margin-left: var(--margin-small);
  }

  `];
}
