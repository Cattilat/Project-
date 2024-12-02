import React, { useState } from 'react';
import useSWR from 'swr';
import FeaturedProducts from '../components/FeaturedProducts';

const Shop = () => {
  const fetcher = (url) => fetch(url, { method: "GET" }).then((res) => res.json());

  const [fetchUrl, setFetchUrl] = useState(
    `${import.meta.env.VITE_APP_API_URL}/products`
  );

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  return (
    <div className="container mx-auto px-4 py-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">Failed to load products, please try again.</div>
      ) : (
        <div>
          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data && data.map((item) => (
              <FeaturedProducts key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
