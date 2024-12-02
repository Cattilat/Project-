import React, { useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import useSWR from "swr";
import { HiArrowRight } from "react-icons/hi";

const Featured = () => {
  const fetcher = (url) =>
    fetch(url, { method: "GET" }).then((res) => res.json());

  const [fetchUrl, setFetchUrl] = useState(
    `${import.meta.env.VITE_APP_API_URL}/products`
  );

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  return (
    <div className="flex flex-col">
    {/* Banner Section */}
    <div className="w-full h-96 flex flex-col md:flex-row items-center bg-slate-200 py-10 px-5">
      <div className="text-center md:text-left md:w-1/2 px-5">
        <h1 className="text-4xl font-bold font-sans leading-snug">
          Discover Our <span className="text-blue-600">Featured Products</span>
        </h1>
        <p className="mt-5 text-gray-700 text-sm md:text-base">
          Explore our specially curated selection of products to enhance your
          style, comfort, and vision. Shop now to find the perfect match!
        </p>
        <button className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all">
          Shop Now
          <HiArrowRight />
        </button>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://salinaka-ecommerce.web.app/images/banner-guy.fbf4f0f7396fe31ca288dc1dd9822342.png"
          className="w-full h-96 object-contain"
          alt="Banner"
        />
      </div>
    </div>
  
    {/* Content Section */}
    <div className="py-10 px-5">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loader border-t-blue-500 border-4 rounded-full w-10 h-10 animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          Failed to load products. Please try again later.
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {data.map((item) => (
              <FeaturedProducts key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Featured;
