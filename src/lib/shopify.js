const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_VERSION || "2026-01";

async function shopifyQuery(query) {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API Error: ${response.statusText}`);
  }
  
  const json = await response.json();
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error("Failed to fetch data from Shopify");
  }
  
  return json;
}

// 1. Fetch Products with Variant IDs (Crucial for the Buy Button)
export async function getAllProducts() {
  const query = `{
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges { node { url altText } }
          }
          variants(first: 1) {
            edges {
              node {
                id 
              }
            }
          }
        }
      }
    }
  }`;
  const res = await shopifyQuery(query);
  return res.data.products.edges;
}

// 2. The "Buy Now" Logic -> Redirects user to Shopify Checkout
export async function createCheckout(variantId) {
  const query = `
    mutation {
      checkoutCreate(input: { lineItems: [{ variantId: "${variantId}", quantity: 1 }] }) {
        checkout { webUrl }
      }
    }
  `;
  const res = await shopifyQuery(query);
  // This sends the user to the secure Shopify payment page
  window.location.href = res.data.checkoutCreate.checkout.webUrl;
}const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_VERSION || "2026-01";

async function shopifyQuery(query) {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API Error: ${response.statusText}`);
  }
  
  const json = await response.json();
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error("Failed to fetch data from Shopify");
  }
  
  return json;
}

// 1. Fetch Products with Variant IDs (Crucial for the Buy Button)
export async function getAllProducts() {
  const query = `{
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges { node { url altText } }
          }
          variants(first: 1) {
            edges {
              node {
                id 
              }
            }
          }
        }
      }
    }
  }`;
  const res = await shopifyQuery(query);
  return res.data.products.edges;
}

// 2. The "Buy Now" Logic -> Redirects user to Shopify Checkout
export async function createCheckout(variantId) {
  const query = `
    mutation {
      checkoutCreate(input: { lineItems: [{ variantId: "${variantId}", quantity: 1 }] }) {
        checkout { webUrl }
      }
    }
  `;
  const res = await shopifyQuery(query);
  // This sends the user to the secure Shopify payment page
  window.location.href = res.data.checkoutCreate.checkout.webUrl;
}