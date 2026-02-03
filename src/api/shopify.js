// src/api/shopify.js
const storefrontToken = import.meta.env.VITE_SHOPIFY_TOKEN;
const domain = "srow-gym-store.myshopify.com";

export async function fetchGymClothes() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges { node { url } }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${domain}/api/2026-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  return data.products.edges;
}