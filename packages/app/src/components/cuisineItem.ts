import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";


export class CuisineElement extends LitElement {
    @property({ attribute: "cuisine" })
    cuisine?: string;

    @property({ attribute: "icon" })
    icon?: string;

  override render() {
    return html`
    <a href=${`/app/cuisine/${this.cuisine}`}>
          ${this.cuisine}   
        </br>     
          <svg>
            <use href=${this.icon}></use>
          </svg>
    </a>  
    `;
  }

  static styles = [
    reset.styles,
    css`
    :host {
      display: block;
      box-sizing: border-box;
    }

  a{
    width: 80%;          
    height: 100%;
    color: var(--color-text);
    text-decoration: none;
    border: var(--color-text) 1px solid;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-header);
    padding: var(--padding-small);
    margin: var(--margin-medium);
    box-sizing: border-box;}

  svg{
    display: inline;
    height: var(--icon-size-big);
    width: var(--icon-size-big);
    vertical-align: middle;
    fill: var(--color-link);
    color: var(--color-link);
  }
a[href]{
  color: var(--color-link);
  text-decoration: none;
}
  `];
}