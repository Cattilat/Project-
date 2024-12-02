import React from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ product : {id,product_name, product_price, product_image,product_description}}) => {

  return (
    <div className="inline-flex flex-col w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <Link to={`/product/${id}`} className="group">
      <img
        src={product_image}
        className="w-full h-60 object-contain object-center group-hover:scale-105 transition-transform duration-300 bg-gray-100"
        alt={product_name}
      />
      <div className="flex flex-col bg-white p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">
          {product_name}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product_description}
        </p>
      </div>
    </Link>
  </div>
  
  );
};

export default FeaturedProducts;
