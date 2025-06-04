import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, define, Observer } from "@calpoly/mustang";
import reset from "../styles/reset.css.ts";
interface Restaurant {
  name: string;
  cuisine: string;
  foods: string[];
  image: string;
  location: string;
  description: string;
}

export class AllRestaurantsElement extends LitElement {
  static uses = define({});

  @property()
  src?: string;

  @state()
  restaurants: Restaurant[] = [];

  private _authObserver = new Observer<Auth.Model>(this, "food:auth");
  private _user?: Auth.User;

  override connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this._user?.authenticated && this.src) {
        this.hydrate(this.src);
      }
    });
  }

  get authorization(): { Authorization?: string } {
    if (this._user?.authenticated) {
      return {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    } else return {};
  }

  hydrate(src: string) {
    fetch(src, {
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch restaurants: ${res.status}`);
        return res.json();
      })
      .then((json: Restaurant[]) => {
        this.restaurants = json;
        console.log("Loaded restaurants:", this.restaurants);
      })
      .catch(err => {
        console.error("Error loading restaurants:", err);
      });
  }

  render() {
    const { restaurants } = this;

    return html`
      <div class="restaurant-list">
        ${restaurants.map(
          (r) => html`
          <a href=${`/app/restaurant/${r.name}`}>
            <section class="restaurant-card">
              <h3>${r.name}</h3>
              <img src=${r.image}>
            </section>
          </a>
          `
        )}
      </div>
    `;
  }

static styles = [ reset.styles,
    css`
:host {
  display: block;
  padding: var(--padding-med);
  font-family: var(--font-family-text);
  background-color: var(--color-background-page);
  color: var(--color-text);
}

.restaurant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--margin-big);
}

.restaurant-card {
  border: 1px solid var(--color-background-header-text); /* or --color-text if you want higher contrast */
  border-radius: var(--margin-medium);
  padding: var(--padding-med);
  background: var(--color-card);
  color: var(--color-text);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.restaurant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.restaurant-card img {
  width: 100%;
  height: 300px;
  display: block;
  border-radius: var(--margin-small);
  object-fit: cover;
  vertical-align: middle;
}

.restaurant-card h3 {
  margin: 0 0 var(--margin-small) 0;
  font-size: var(--font-size-text);
  font-weight: var(--font-weight-subheader);
  color: var(--color-text);
}

.restaurant-card p {
  margin: 0 0 var(--margin-small) 0;
  font-size: var(--font-size-small);
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--padding-small);
}

.restaurant-card ul {
  list-style: none;
  padding-left: var(--padding-med);
  margin: 0;
  color: var(--color-text);
}

.restaurant-card li::before {
  content: "🍽️ ";
  margin-right: var(--padding-small);
}

`];
}
