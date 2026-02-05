import { useEffect, useState } from 'react';
import { getAllProducts } from '../lib/shopify';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
      {products.map(({ node }) => (
        <div key={node.id} className="border p-4 rounded-lg shadow-lg">
          <img src={node.images.edges[0]?.node.url} alt={node.title} className="w-full h-64 object-cover" />
          <h2 className="mt-4 text-xl font-bold">{node.title}</h2>
          <p className="text-gray-600">
            {node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}
          </p>
          <button className="mt-4 bg-black text-white px-6 py-2 w-full rounded">
            View Item
          </button>
        </div>
      ))}
    </div>
  );
}