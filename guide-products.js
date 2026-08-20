import { productsBySlug } from "./src/products.js";

document.querySelectorAll("[data-product]").forEach((surface) => {
  const product = productsBySlug[surface.dataset.product];
  if (!product) return;
  const link = surface.querySelector('a[href*="amazon"], a[href*="amzn.to"]');
  if (!link) return;
  link.href = product.affiliateUrl;
  link.target = "_blank";
  link.rel = "sponsored nofollow noopener noreferrer";
});
