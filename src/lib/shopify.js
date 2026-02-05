const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_TOKEN;

async function shopifyQuery(query) {
  const endpoint = `https://${domain}/api/2026-01/graphql.json`;
  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) throw new Error("Shopify API request failed");
  return await response.json();
}

// Function to fetch all products (Gym clothes)
export async function getAllProducts() {
  const query = `{
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
  }`;
  const res = await shopifyQuery(query);
  return res.data.products.edges;
}

export async function createCheckout(variantId) {
  const query = `
    mutation {
      checkoutCreate(input: { lineItems: [{ variantId: "${variantId}", quantity: 1 }] }) {
        checkout { webUrl }
      }
    }
  `;
  const res = await shopifyQuery(query);
  window.location.href = res.data.checkoutCreate.checkout.webUrl;
}