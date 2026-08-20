import { AFFILIATE_DISCLOSURE, products, validateProducts } from "./src/products.js";

const errors = validateProducts(products);
if (errors.length) throw new Error(`Invalid product catalog: ${errors.join("; ")}`);

const shopSlugs = [
  "herman-miller-aeron", "ergotron-lx-pro", "oakywood-desk-shelf-mini",
  "univivi-under-desk-cable-tray", "anker-prime-3-in-1", "benq-e-reading-desk-lamp",
  "keychron-q1-ultra", "orbitkey-desk-mat"
];
const shopProducts = shopSlugs.map((slug) => products.find((product) => product.slug === slug));
const grid = document.querySelector("#product-grid");
const count = document.querySelector("#shop-count");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

const productCard = (product, index) => `
  <article class="shop-card" data-category="${escapeHtml(product.category)}" data-product="${escapeHtml(product.slug)}" style="--card-order:${index}">
    <div class="shop-card-image">
      <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.imageAlt)}" width="1200" height="800" loading="lazy" decoding="async">
      <span>${escapeHtml(product.bestFor)}</span>
    </div>
    <div class="shop-card-copy">
      <p class="product-category">${escapeHtml(product.category)} · ${escapeHtml(product.brand)}</p>
      <h2>${escapeHtml(product.name)}</h2>
      <p>${escapeHtml(product.shortDescription)}</p>
      <div class="shop-card-action">
        <a class="shop-link" href="${escapeHtml(product.affiliateUrl)}" target="_blank" rel="sponsored nofollow noopener noreferrer">View on Amazon <span aria-hidden="true">↗</span></a>
        <small>Price and availability are determined on Amazon.</small>
      </div>
    </div>
  </article>`;

grid.innerHTML = shopProducts.map(productCard).join("");
document.querySelector("[data-catalog-disclosure]").textContent = AFFILIATE_DISCLOSURE;

const itemListSchema = document.createElement("script");
itemListSchema.type = "application/ld+json";
itemListSchema.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Desk Atlas product edit",
  numberOfItems: shopProducts.length,
  itemListElement: shopProducts.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: product.sourceUrl
  }))
});
document.head.append(itemListSchema);

const filters = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll(".shop-card")];
function setFilter(filter) {
  let visible = 0;
  cards.forEach((card) => {
    const show = filter === "all" || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  filters.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  count.textContent = `Showing ${visible} considered ${visible === 1 ? "pick" : "picks"}`;
}
filters.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
setFilter("all");
