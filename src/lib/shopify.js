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

// 2. The "Buy Now" Logic -> Uses the new Cart API to redirect to checkout
export async function createCheckout(variantId) {
  const query = `
    mutation {
      cartCreate(input: { lines: [{ merchandiseId: "${variantId}", quantity: 1 }] }) {
        cart { checkoutUrl }
      }
    }
  `;
  
  const res = await shopifyQuery(query);
  
  if (res.data?.cartCreate?.cart?.checkoutUrl) {
    window.location.href = res.data.cartCreate.cart.checkoutUrl;
  } else {
    console.error("Failed to create cart:", res);
    alert("Checkout is currently unavailable. Please try again.");
  }
}

// 3. Fetch a single product by its handle
export async function getProductByHandle(handle) {
  const query = `{
    product(handle: "${handle}") {
      id
      title
      description
      priceRange {
        minVariantPrice { amount currencyCode }
      }
      images(first: 4) {
        edges { node { url altText } }
      }
      variants(first: 1) {
        edges { node { id } }
      }
    }
  }`;
  const res = await shopifyQuery(query);
  return res.data.product;
}