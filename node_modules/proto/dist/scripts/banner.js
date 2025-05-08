import {
    css,
    define,
    html,
    shadow
  } from "@calpoly/mustang";
  
  export class TitleBanner extends HTMLElement {
  
    static template = html`<template>
    <h1 id="Logo">
      <span>
        <svg class="icon">
          <use href="/icons/header.svg#icon-logo"></use>
        </svg>
        Food Finder
      </span>
      <slot name="name'>Title</slot>
      <span>
        <svg class="icon">
          <use href="/icons/header.svg#icon-user"></use>
        </svg>
        Account
    </span>
    </h1>
  </template>`;
  
    static styles = css`
      :host {
        display: contents;
      }
      header {
        --color-link: var(--color-link-inverted);
  
        display: flex;
        flex-wrap: wrap;
        align-items: bottom;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
      }
      header ~ * {
        margin: var(--size-spacing-medium);
      }
      nav {
        display: flex;
        flex-direction: column;
        flex-basis: max-content;
        align-items: end;
      }
    `;
  
    constructor() {
      super();
      shadow(this)
        .template(TitleBanner.template)
        .styles(
          reset.styles,
          headings.styles,
          TitleBanner.styles
        );
    }
  }
  