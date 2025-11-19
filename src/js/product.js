import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// get the product ID from the URL
const productId = getParam("product");

// create a data source for tents
const dataSource = new ProductData("tents");

// create an instance of the ProductDetails class
const product = new ProductDetails(productId, dataSource);

// initialize the product page (fetches details, renders HTML, sets up Add to Cart button)
product.init();
