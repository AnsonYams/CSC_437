import {css, html, LitElement } from "lit";
import reset from "../styles/reset.css.ts";

export class HomeViewElement extends LitElement {

  
  render() {
    return html`
        <title-banner></title-banner>
        <sub-banner subheader="Select a Cuisine: "></sub-banner>
        <all-cuisines src="/api/cuisines" class="cuisine-grid"></all-cuisines>
    `;
  }

  static styles = [
    reset.styles,
    css`
    .cuisine-grid {
        display: grid;
        grid-template-columns: [start] 1fr 1fr 1fr [end];
        gap: var(--margin-big); 
        justify-items: stretch; 
        margin: var(--margin-big);
        width: 100%;
      }
          `
  ];
}
