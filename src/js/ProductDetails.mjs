import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render HTML
    this.renderProductDetails();

    // Add listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Logic from your old product.js
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(this.product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${this.product.name} added to cart!`);
  }

  renderProductDetails() {
    // Example: populate the page dynamically
    document.getElementById('productName').textContent = this.product.name;
    document.getElementById('productPrice').textContent = `$${this.product.price}`;
    document.getElementById('productImage').src = this.product.image;
    document.getElementById('productDescription').textContent = this.product.description;
  }
}
