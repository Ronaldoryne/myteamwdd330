import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get the product ID from the URL
const productId = getParam("product");

// Create a data source for tents
const dataSource = new ProductData("tents");

// Create an instance of the ProductDetails class
const product = new ProductDetails(productId, dataSource);

// Initialize the product page (fetch details, render HTML, set up Add to Cart button)
product.init();
