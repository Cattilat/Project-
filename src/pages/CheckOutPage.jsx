import React from "react";
import useProductStore from "../store/useStore";

const CheckOutPage = () => {
  const { products } = useProductStore();
  console.log(products);
  return (
    <div>
      <div className="max-w-xl mx-auto flex-col ">
        <div className="text-center">
          <h1 className="text-sm font-bold">Order in Summary</h1>
          <p className="mt-10 mb-5 text-gray-500 font-bold">Review items in your order</p>
        </div>
        <div className="w-full flex flex-col">
          <ul className="space-y-4">
            {products.map((product, index) => (
              <li
                key={index}
                className="flex items-center gap-4 border-b border-gray-300 pb-4"
              >
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="w-16 h-16 object-contain rounded-md"
                />
                <div className="flex gap-10 items-center">
                  <h2 className="text-lg font-bold text-gray-700">
                    {product.product_name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ${product.product_price}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      Qty: {product.quantity}
                    </span>
                    <span className=" flex items-center gap-2 text-sm font-medium text-gray-600">
                      Color :{" "}
                      <button
                       
                        className={`w-6 h-6 rounded-full border bg-${
                          product.product_color
                        }-500`}
                      ></button>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
