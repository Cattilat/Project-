import React, { useEffect, useState } from "react";

import useProductStore from "../store/useStore";
import {
  HiChatBubbleLeftRight,
  HiCheck,
  HiMinusSmall,
  HiPlus,
} from "react-icons/hi2";
import { HiMinus, HiSelector } from "react-icons/hi";
import useBtnStore from "../store/useBtnstore";

const ProductDetails = ({
  product: {
    id,
    product_name,
    product_price,
    product_image,
    product_description,
  },
}) => {
  const [quantity, setQuantity] = useState(1);
  const [productAdd, setProductAdd] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [color,setColor] = useState(0); // State for color selection
  const [active,setActive] = useState(false);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const { addProduct, removeProduct } = useProductStore();

  const {btn,setBtn} = useBtnStore();

  const handleBtn = (index,color,name) => {
    setBtn(index);
    setSelectedColor(color);
    setColor(name);
    
  };
  console.log(btn);

  const newProduct = {
    id: id,
    product_name: product_name,
    product_price: product_price,
    product_image: product_image,
    product_color: color,
    quantity: quantity,
    total: quantity * parseFloat(product_price),
  };

  const handleOnclick = () => {
    // Add product to cart
    addProduct(newProduct);
    setProductAdd(true);
  };

  const handleRemove = () => {
    // Remove product from cart
    removeProduct(id);
    setProductAdd(false);
  };

  useEffect(() => {
    if(btn.length > 0) setSelectedColor(btn.filter(item => item.isCheck === true)[0].filter);
  },[btn]);
  return (
    <div className="border border-black rounded-sm p-5 mt-10">
      <div className="flex justify-between w-full">
        <div className="w-3/4 items-center flex">
          <img
            src={product_image}
            id="productImage"
            alt="Product"
            className={`w-full h-80 object-contain object-center`}
            style={{
              filter: `${btn.filter(item => item.isCheck === true) && `hue-rotate(${selectedColor}deg)`} `,
            }}
          />
        </div>
        <div className="pl-5 ml-4 flex flex-col gap-3 items-start">
          <p className="text-2xl font-bold text-gray-600">{product_name}</p>
          <p className="text-sm text-gray-400 font-sans">
            {product_description}
          </p>
          <p className="text-sm text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
            soluta harum eius officiis omnis quis eos nemo labore! Tempora
            possimus magni ab aspernatur ut exercitationem voluptatibus aperiam
            dolores quasi unde!
          </p>
          <hr className="mt-5 w-full" />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-300 mb-3 font-sans">
              Choose Color
            </h1>
            <div className="flex font-semibold gap-3">
              {/* Color options */}
               {btn.map((item,index) => (
                 <button onClick={handleBtn.bind(null, index,item.filter,item.name)}  className={`w-8 h-8 rounded-full flex item-center justify-center`} style={{backgroundColor : item.color}} key={index}>
                  {item.isCheck && <HiCheck className="text-white font-bold items-center mt-2" />}
                 </button>
               ))}
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-600 mt-5 font-sans">
            ${product_price}
          </p>
          <div className="flex gap-3 items-center">
            <button
              onClick={incrementQuantity}
              className="p-1 rounded-full border active:bg-slate-300 text-black"
            >
              <HiPlus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={decrementQuantity}
              disabled={quantity === 1} // Disable when quantity is 1
              className={`p-1 rounded-full border text-black ${
                quantity === 1 ? "cursor-not-allowed" : "active:bg-slate-300"
              }`}
            >
              <HiMinus />
            </button>
          </div>
          {productAdd ? (
            <button
              onClick={handleRemove}
              className={`bg-black text-white p-3 rounded-sm transform transition-transform `}
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={handleOnclick}
              className="bg-black text-white p-3 rounded-sm transform transition-transform hover:scale-110"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
