import { html, css, LitElement } from "lit";
import reset from "./styles/reset.css.ts";
import { Auth, Events, Observer } from "@calpoly/mustang";
import { state } from "lit/decorators.js";
import { property } from "lit/decorators.js";

export class TitleBannerElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "food:auth");
  @state()
  loggedIn = false;

  @state()
  userid?: string;

  @property({ type: String })
  title: string = "Home";

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;
      console.log("user", user);
      if (user && user.authenticated ) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }
  
  renderSignOutButton() {
  return html`
    <button
      @click=${(e: UIEvent) => {
        Events.relay(e, "auth:message", ["auth/signout"])
      }}
    >
      Sign Out
    </button>
  `;
}

renderSignInButton() {
  return html`
    <a href="/login.html">
    <button>
      Sign In…
    </button>
    </a>
  `;
}
  
  override render() {
    return html`
        <h1>
        <a href="/index.html">
                <svg>
                    <use href="/icons/header.svg#icon-logo"></use>
                </svg>
            Food Finder
        </a>
            <span>${this.title}</span>
            <span>
                <svg >
                    <use href="/icons/header.svg#icon-user"></use>
                </svg>
                <a slot="actuator">
                  ${this.userid || " "}
                    ${this.loggedIn ?
                    this.renderSignOutButton() :
                    this.renderSignInButton()
                  }
                </a>
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
