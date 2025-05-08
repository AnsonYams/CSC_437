import { html, css, LitElement } from "lit";
import reset from "./styles/reset.css.ts";

export class TitleBannerElement extends LitElement {
  override render() {
    return html`
        <h1>
            <span>
                <svg>
                    <use href="../public/icons/header.svg#icon-logo"></use>
                </svg>
            Food Finder
            </span>
            <slot name="title">Home</slot>
            <span>
                <svg >
                    <use href="../public/icons/header.svg#icon-user"></use>
                </svg>
                Account
            </span>
        </h1>
    `;
  }

  static styles = [
    reset.styles,
    css`
  h1{
    color: var(--color-text);
    background-color: var(--color-background-header);
    font-family: var(--font-family-header);
    font-size: var(--font-size-header);
    font-weight: var(--font-weight-header);
    display: flex;
    align-items: baseline;
    align-content: center;
    justify-content: space-between;
    padding-left: var(--padding-header);
    text-align: center;
    padding-right: var(--padding-header);}
  svg{
    display: inline;
    height: var(--icon-size-medium);
    width: var(--icon-size-medium);
    vertical-align: middle;
    fill: var(--color-text);
    color: var(--color-text);
  }
  `];
}