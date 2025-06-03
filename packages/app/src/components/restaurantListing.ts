import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, define, Observer } from "@calpoly/mustang";

interface Food {
  food_name: string;
}

interface Cuisine {
  cuisine: string;
  icon: string;
}

interface Restaurant {
  name: string;
  cuisine_id: Cuisine;
  food_ids: Food[];
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
            <section class="restaurant-card">
              <h3>${r.name}</h3>
            </section>
          `
        )}
      </div>
    `;
  }

  static styles = css`
  :host {
    display: block;
    padding: 1rem;
    font-family: system-ui, sans-serif;
  }

  .restaurant-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .restaurant-card {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .restaurant-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .restaurant-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: #333;
  }

  .restaurant-card p {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .restaurant-card img {
    vertical-align: middle;
  }

  .restaurant-card ul {
    list-style: none;
    padding-left: 1rem;
    margin: 0;
    color: #444;
  }

  .restaurant-card li::before {
    content: "🍽️ ";
    margin-right: 0.25rem;
  }
`;
}
