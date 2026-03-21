import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByHandle, createCheckout } from '../lib/shopify';

export default function ProductDetail() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductByHandle(handle)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [handle]);

  if (loading) return <div className="flex justify-center items-center h-[60vh] font-bold">LOADING ITEM...</div>;
  if (!product) return <div className="text-center mt-20">Product not found.</div>;

  const variantId = product.variants.edges[0]?.node.id;
  const imageUrl = product.images.edges[0]?.node.url;
  const price = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={product.title} className="w-full h-auto object-cover" />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">No Image</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-4">{product.title}</h1>
          <p className="text-2xl font-medium text-gray-900 mb-6">{currency} {Math.round(price)}</p>
          
          <div className="prose prose-sm text-gray-500 mb-8">
            <p>{product.description}</p>
          </div>

          <button
            onClick={() => createCheckout(variantId)}
            className="w-full bg-black border border-transparent rounded-md py-4 px-8 flex items-center justify-center text-lg font-bold text-white uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}