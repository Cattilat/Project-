import React, { useEffect, useState } from "react";
import useProductStore from "../store/useStore";
import reactUseCookie from "react-use-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLogin from "../store/useLogin";

const Cart = ({ open, setOpen }) => {
  const { products, removeProduct } = useProductStore();

  const total = products.reduce((acc, product) => acc + product.total, 0);

  const [user, setUser] = reactUseCookie("user");

  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useLogin();


  useEffect(() => {
    if(products.length === 0){
      navigate("/");
    } 
  },[products,navigate]);
  const handleClick = () => {
    console.log("clicked");
    setOpen(!open);
  };

  const handleRemove = (id) => {
    console.log("remove");
    console.log(id);
    removeProduct(id);
  };
  const handleCheckOut = () => {
    console.log("checkout");
    if (isLogin) {
      navigate("/checkout");
      setOpen(false);
      const cart = document.querySelector("#cart");
      if(cart){
        cart.classList.add("cursor-not-allowed");
        cart.classList.add("opacity-50");
        cart.disabled = true;
      }
    } else {
      if (products.length === 0) {
        toast.error("there is no product to be checked out");
      } else {
        toast.error("please login first");
      }
    }
  };
  return (
    <div
      className={`cart fixed right-0 top-0 z-40 flex flex-col flex-grow bg-slate-200 w-full sm:w-1/3 h-full shadow-lg transform transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-5 border-b border-gray-300">
        <h1 className="text-lg font-bold">My Basket</h1>
        <button
          onClick={handleClick}
          className="text-gray-500 font-bold border border-gray-500 px-3 py-1 rounded-md"
        >
          Close
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <p className="text-gray-500 text-sm">({products.length} items)</p>

        {/* Dynamic Product Display */}
        <div className="scrollable-content flex flex-col overflow-y-scroll max-h-[calc(100vh-250px)]">
          {products.length > 0 ? (
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
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-700">
                      {product.product_name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      ${product.product_price}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-gray-600">
                        Qty: {product.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleRemove(product.id);
                    }}
                    className="text-red-500 font-bold hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic text-center">
              Your cart is empty!
            </p>
          )}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="p-5 border-t mt-auto border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold">Total:</p>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckOut}
          disabled = {products.length === 0}
          className={`w-full bg-black text-white py-2 rounded-md shadow-lg hover:bg-gray-800  disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
