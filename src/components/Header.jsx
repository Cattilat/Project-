import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import useProductStore from "../store/useStore";
import reactUseCookie, { removeCookie } from "react-use-cookie";
import { HiChevronDown, HiOutlineLogout, HiUserCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import useLogin from "../store/useLogin";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = reactUseCookie("user");
  const [token, setToken] = reactUseCookie("token");
  const userProfile = user ? JSON.parse(user) : null;
  const firstname = user ? userProfile.name.charAt(0).toUpperCase() : "";
  const { products } = useProductStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLogin();

  const handledisable = (e) => {
    e.stopPropagation();
    const cart = document.querySelector("#cart");
    if (cart) {
       cart.classList.remove("cursor-not-allowed");
       cart.classList.remove("opacity-50");
       cart.disabled = false;
    } 
  }

  // Sync login state with cookie on component mount
  useEffect(() => {
    if (user && token) {
      setIsLogin(true); // User is logged in, update the state
    } else {
      setIsLogin(false); // No user or token, set login to false
    }
  }, [user, token, setIsLogin]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        removeCookie("token");
        removeCookie("user");
        setIsLogin(false); // Logout user and update login state
        navigate("/login");
        toast.success("Logout successful!");
      } else {
        const errorData = await response.json();
        console.error("Logout error:", errorData);
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error during logout:", error);
      toast.error("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce(async (e) => {
    const query = e.target.value.trim();
    if (!query) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/find?q=${query}`);
      if (response.ok) {
        const searchResults = await response.json();
        console.log("Search results:", searchResults);
      } else {
        console.error("Search failed:", await response.json());
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }, 300);

  return (
    <>
      <Cart open={isMenuOpen} setOpen={setIsMenuOpen} />
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md h-20 px-8 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png"
              alt="Logo"
              className="h-8 w-auto sm:h-10 object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" onClick={handledisable} className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/featured" onClick={handledisable} className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
              Featured
            </Link>
            <Link to="/shop" onClick={handledisable} className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
              Shop
            </Link>
            <Link to="/contact" onClick={handledisable} className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Cart */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative" id="cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3 6l3 1m0 0h12l3-1M6 7v13h12V7M6 7L5 3m13 4l1-4" />
                <path d="M16 10a4 4 0 1 1-8 0" />
              </svg>
              {products.length > 0 && (
                <span className="absolute top-[-13px] right-[-15px] font-bold text-sm text-red-500 px-2">
                  {products.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isLogin ? (
              <div className="relative">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdownVisible(!isDropdownVisible)}>
                  <p className="text-sm font-medium">{userProfile.name}</p>
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white text-lg rounded-full">
                    {firstname}
                  </div>
                  <HiChevronDown className="w-5 h-5" />
                </div>
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownVisible(false)}
                    >
                      <HiUserCircle className="inline w-5 h-5 mr-2" />
                      Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <HiOutlineLogout className="inline w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/signUp" className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
                  Sign Up
                </Link>
                <Link to="/login" className="px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-300">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
