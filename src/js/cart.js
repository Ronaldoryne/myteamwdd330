import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  // Elements for footer and total
  const cartFooter = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  // If cart is empty
  if (!cartItems.length) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    return;
  }

  // Render each cart item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  // Show footer and update total
  cartFooter.classList.remove("hide");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

// Initialize cart rendering
renderCartContents();
