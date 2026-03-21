import { useEffect, useState } from 'react';
import { getAllProducts, createCheckout } from '../lib/shopify';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen font-mono">LOADING SROW_GEAR...</div>;

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 italic">SROW GYM</h1>
          <p className="text-lg md:text-xl uppercase tracking-widest font-light">Performance & Style. Built for the Grind.</p>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-12 border-b-2 border-black inline-block">New Drops</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {products.map(({ node }) => {
            return (
              <div key={node.id} className="group border p-3 sm:p-4 rounded-lg shadow-lg bg-white">
                <Link to={`/product/${node.handle}`}>
                  <img src={node.images.edges[0]?.node.url} alt={node.title} className="w-full h-56 sm:h-64 object-cover rounded" />
                  <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold uppercase tracking-tighter italic leading-tight">{node.title}</h2>
                </Link>
                <p className="mt-1 text-gray-600 font-mono text-sm sm:text-base">¥{Math.round(node.priceRange.minVariantPrice.amount)}</p>
                <button 
                  onClick={() => createCheckout(node.variants.edges[0]?.node.id)}
                  className="mt-3 sm:mt-4 w-full min-h-11 rounded bg-black text-white px-3 py-2.5 text-sm sm:text-base leading-tight font-black uppercase italic tracking-wide hover:bg-zinc-800 transition-colors"
                >
                  Quick Buy
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
// import { useEffect, useState } from 'react';
// import { getAllProducts, createCheckout } from '../lib/shopify';

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch products when the page loads
//     getAllProducts()
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-20">Loading SROW Gear...</div>;

//   return (
//     <div>
//       <h2 className="text-3xl font-extrabold mb-8 text-center">New Arrivals</h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map(({ node }) => {
//           // We grab the first variant ID (e.g., "Small/Black") for the button
//           const variantId = node.variants.edges[0]?.node.id;
//           const imageUrl = node.images.edges[0]?.node.url;
//           const price = node.priceRange.minVariantPrice.amount;
//           const currency = node.priceRange.minVariantPrice.currencyCode;

//           return (
//             <div key={node.id} className="group border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
//               {/* Image */}
//               <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
//                 {imageUrl ? (
//                   <img src={imageUrl} alt={node.title} className="h-64 w-full object-cover object-center group-hover:opacity-75" />
//                 ) : (
//                   <div className="h-64 bg-gray-300 flex items-center justify-center">No Image</div>
//                 )}
//               </div>
              
//               {/* Details */}
//               <div className="p-4">
//                 <h3 className="text-lg font-medium text-gray-900">{node.title}</h3>
//                 <p className="mt-1 text-lg font-bold text-gray-900">{currency} {price}</p>
                
//                 {/* BUY BUTTON */}
//                 <button 
//                   onClick={() => createCheckout(variantId)}
//                   className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

