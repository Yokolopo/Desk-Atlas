import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        shop: "shop.html",
        guide: "declutter-desk-accessories.html",
        disclosure: "disclosure.html",
        about: "about.html",
        authors: "authors.html",
        editorial: "editorial-policy.html",
        privacy: "privacy.html",
        terms: "terms.html",
        contact: "contact.html"
      }
    }
  }
});
