// helper to convert fetch response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response: " + res.status);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  // fetch all products
  getData() {
    return fetch(this.path).then(convertToJson);
  }

  // find a product by ID (async/await)
  async findProductById(id) {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);

    if (!product) {
      throw new Error(`Product with ID "${id}" not found.`);
    }

    return product;
  }
}
