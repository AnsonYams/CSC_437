import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class CuisineViewElement extends LitElement {
  @property()
  cuisine: string = "";

  render() {
    this.cuisine = this.cuisine.split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .trim();  

    const src = `/api/restaurants?cuisine=${this.cuisine}`;

    return html`
      <title-banner title=${this.cuisine}></title-banner>
      <sub-banner subheader="← Back" src="/app"></sub-banner>
      <all-restaurants src=${src}></all-restaurants>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
