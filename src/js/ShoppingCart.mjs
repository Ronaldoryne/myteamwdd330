import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Template for a single cart item
function cartItemTemplate(item) {
  // Ensure item and required fields exist
  if (!item || !item.Id || !item.Name || !item.FinalPrice || !item.quantity) return "";

  const colorName = item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "N/A";

  return `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__name-link">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    
    <div class="cart-card__quantity-controls">
      <button class="quantity-btn" data-id="${item.Id}" data-action="decrement" aria-label="Decrement quantity">–</button>
      <span class="quantity-display">${item.quantity}</span>
      <button class="quantity-btn" data-id="${item.Id}" data-action="increment" aria-label="Increment quantity">+</button>
    </div>
    
    <p class="cart-card__price" style="grid-row: 2; grid-column: 3; text-align: right;">
      $${(item.FinalPrice * item.quantity).toFixed(2)}
    </p>

    <span class="cart-card__remove" data-id="${item.Id}" 
      style="grid-row: 1 / span 2; grid-column: 4; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem;">
      X
    </span>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    let cartItems = getLocalStorage("so-cart") || [];
    
    // Ensure all items have quantity
    cartItems = cartItems.map(item => {
      if (!item.quantity) item.quantity = 1;
      return item;
    });

    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalElement = document.querySelector(".cart-total");

    if (cartItems.length > 0) {
      if (cartFooter) cartFooter.classList.remove("hide");

      // Calculate total safely
      const total = cartItems.reduce((acc, item) => {
        if (!item || !item.FinalPrice || !item.quantity) return acc;
        return acc + item.FinalPrice * item.quantity;
      }, 0);

      if (cartTotalElement) cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

      this.listElement.innerHTML = cartItems.map(cartItemTemplate).join("");

      // Add listener for remove buttons
      this.listElement.querySelectorAll(".cart-card__remove").forEach(btn => {
        btn.addEventListener("click", () => this.removeFromCart(btn.dataset.id));
      });

      // Add listener for quantity buttons
      this.listElement.querySelectorAll(".quantity-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const action = btn.dataset.action;
          const id = btn.dataset.id;
          if (action === "increment") {
            this.updateQuantity(id, 1);
          } else if (action === "decrement") {
            this.updateQuantity(id, -1);
          }
        });
      });

    } else {
      // Empty cart
      if (cartFooter) cartFooter.classList.add("hide");
      if (cartTotalElement) cartTotalElement.textContent = "";
      this.listElement.innerHTML = "<li>Your cart is empty.</li>";
    }

    // Save corrected cart and update header count
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
  }

  removeFromCart(id) {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems = cartItems.filter(item => item && item.Id !== id);
    setLocalStorage("so-cart", cartItems);
    this.renderCartContents();
  }

  updateQuantity(id, change) {
    const cartItems = getLocalStorage("so-cart") || [];
    const item = cartItems.find(cartItem => cartItem && cartItem.Id === id);

    if (item) {
      item.quantity = (item.quantity || 1) + change;
      if (item.quantity < 1) {
        this.removeFromCart(id);
        return;
      }
    }

    setLocalStorage("so-cart", cartItems);
    this.renderCartContents();
  }
}
