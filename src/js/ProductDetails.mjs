import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product HTML
    this.renderProductDetails();

    // Add listener for Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // 1. Load existing cart array from localStorage
    let cart = getLocalStorage("so-cart") || [];

    // 2. Add the selected product to the array
    cart.push(this.product);

    // 3. Save updated array back to localStorage
    setLocalStorage("so-cart", cart);

    // Optional feedback message
    alert(`${this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    // Populate product information into the HTML
    document.getElementById("productName").textContent = this.product.Name;
    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productImage").src = this.product.Image;
    document.getElementById("productDescription").textContent = this.product.Description;
  }
}
