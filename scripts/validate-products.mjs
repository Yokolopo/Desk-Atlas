import { products, validateProducts } from "../src/products.js";

const errors = validateProducts(products);
if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Validated ${products.length} unique Desk Atlas products.`);
