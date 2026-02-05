import { useEffect, useState } from 'react';
import { getAllProducts, createCheckout } from '../lib/shopify';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products when the page loads
    getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading SROW Gear...</div>;

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-8 text-center">New Arrivals</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(({ node }) => {
          // We grab the first variant ID (e.g., "Small/Black") for the button
          const variantId = node.variants.edges[0]?.node.id;
          const imageUrl = node.images.edges[0]?.node.url;
          const price = node.priceRange.minVariantPrice.amount;
          const currency = node.priceRange.minVariantPrice.currencyCode;

          return (
            <div key={node.id} className="group border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                {imageUrl ? (
                  <img src={imageUrl} alt={node.title} className="h-64 w-full object-cover object-center group-hover:opacity-75" />
                ) : (
                  <div className="h-64 bg-gray-300 flex items-center justify-center">No Image</div>
                )}
              </div>
              
              {/* Details */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{node.title}</h3>
                <p className="mt-1 text-lg font-bold text-gray-900">{currency} {price}</p>
                
                {/* BUY BUTTON */}
                <button 
                  onClick={() => createCheckout(variantId)}
                  className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}