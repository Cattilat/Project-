import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";
import useSWR from "swr";
import Footer from "./Footer";
import Cart from "./Cart";

const Home = () => {
  const fetcher = (url) => fetch(url, { method: "GET" }).then((res) => res.json());

  const [fetchUrl, setFetchUrl] = useState(
    `${import.meta.env.VITE_APP_API_URL}/products`
  );

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const FeaturedProduct = data?.filter((product) => product.product_category === "Eyewear");

  return (
    <>
      {/* Banner Section */}
     
      <div className="w-full h-auto bg-slate-200 flex flex-col py-10 md:py-0  md:flex-row items-center justify-between px-5 md:px-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 leading-snug">
            <span className="text-blue-600">See</span> everything with{" "}
            <strong>Clarity</strong>
          </h1>
          <p className="text-gray-700 text-sm md:text-base font-medium mt-5">
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts—we’ve got your
            eyes covered.
          </p>
          <Link
            to="/shop"
            className="flex items-center justify-center mt-8 gap-2 bg-black text-white py-2 px-5 rounded-lg hover:bg-gray-800 transition-all"
          >
            Shop Now
            <HiArrowRight />
          </Link>
        </div>
        <div className="hidden md:block md:mt-0 md:w-1/2">
          <img
            src="https://salinaka-ecommerce.web.app/images/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png"
            className="w-full h-auto object-contain"
            alt="Eyewear Banner"
          />
        </div>
      </div>

      {/* Featured Products Section */}
      {isLoading ? (
        <div className="text-center py-10 text-xl">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10 text-xl">
          Something went wrong! Please try again.
        </div>
      ) : (
        <>
          {/* Featured Products */}
          <section className="py-16 px-5 md:px-10">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {FeaturedProduct.map((item) => (
                <FeaturedProducts key={item.id} product={item} />
              ))}
            </div>
          </section>

          {/* Recommended Products */}
          <section className="py-16 px-5 md:px-1">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Recommended Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {data.map((item) => (
                <FeaturedProducts key={item.id} product={item} />
              ))}
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
