import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";
import { Events } from "@calpoly/mustang";

function toggleLightMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "light-mode", { checked });
}

export class SubBanner extends LitElement {

    @property({ attribute: "subheader" })
    subheader?: string;

render() {
  return html`
    <div id="topbar">
      <h1>${this.subheader}</h1>
      <label class="switch">
        <input type="checkbox" @change=${toggleLightMode}>
        <span class="slider round"></span>
      </label>
    </div>
  `;
}

  static styles = [
    reset.styles,
    css`
        #topbar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--padding-small);
            background-color: var(--color-background-card);
            color: var(--color-background-header-text);
            font-family: var(--font-family-text);
            font-size: var(--font-size-subheader);
            font-weight: var(--font-weight-subheader); 
            }

        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            border-radius: 34px;
            overflow: hidden; 
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px;
            box-sizing: border-box;
            }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
            }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--color-background-page);
            -webkit-transition: .4s;
            transition: .4s;
            }

        .slider .icon {
            width: 16px;
            height: 16px;
            fill: var(--color-text); /* optional - adjusts icon color */
            z-index: 1;
            pointer-events: none;
            }

        .slider:before {
            content: "";
            position: absolute;
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            border-radius: 50%;
            transition: 0.4s;
            z-index: 2;
            }

        input:checked + .slider {
            background-color: #ccc;
            }

        input:focus + .slider {
            box-shadow: 0 0 1px white;
            }

        input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
            }

        .slider.round {
            border-radius: 34px;
            }

        .slider.round:before {
            border-radius: 50%;
            }

        .buttonIcon{
            display: inline;
            height: var(--icon-size-small);
            width: var(--icon-size-small);
            vertical-align: middle;
            fill: var(--color-text);
            color: var(--color-text);
            }
        a[href]{
            color: var(--color-link);
            text-decoration: none;
            }
  `];

    static initializeOnce() {
    function toggleLightMode(
      page: HTMLElement,
      checked: boolean
    ) {
      page.classList.toggle("light-mode", checked);
    }

    document.body.addEventListener("light-mode", (event) =>
      toggleLightMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}