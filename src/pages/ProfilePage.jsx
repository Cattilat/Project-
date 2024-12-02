import React, { useState } from "react";
import reactUseCookie from "react-use-cookie";
import useLogin from "../store/useLogin";
import WishList from "../components/WishList"; // Assuming you will create the Orders component
import Order from "../components/Order";
import useNav from "../store/useNav";
import { Link, Outlet } from "react-router-dom";

const ProfilePage = () => {
  const [user] = reactUseCookie("user");
  const userDetails = JSON.parse(user);
  const { isLogin } = useLogin();

  // const [isActive, setActive] = useState(false);

  const { navBar, setActive } = useNav();

  const handleHidden = (e, id) => {
    e.preventDefault();
    setActive(id);
  };

  return (
    <>
      {isLogin ? (
        <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
          {/* Navigation Tabs */}
          <nav className="border-b mb-8">
            <ul className="flex flex-wrap gap-4 sm:gap-8 justify-center">
              {navBar.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                      item.isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    onClick={(e) => handleHidden(e, item.id)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Section */}
          <div className={`${navBar[0].isActive ? "block" : "hidden"}`} id="profile">
            <div className="relative mb-20 sm:mb-24 bg-slate-50">
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <img
                  src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
                  alt="Forest in mist"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Avatar */}
              <div className="absolute -bottom-16 sm:-bottom-20 left-4 sm:left-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#C6176C] flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl font-semibold">
                  {userDetails.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Edit Account Button */}
              <div className="absolute top-4 right-4">
                <Link to={`/account/edit/${userDetails.id}`} className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition duration-300">
                  Edit Account
                </Link>
              </div>
            </div>
            
            {/* User Details */}
            <div className="space-y-6 px-4 sm:px-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                {userDetails.name}
              </h1>

              <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl">
                <div>
                  <h2 className="text-gray-600 mb-1 text-sm sm:text-base">
                    Email
                  </h2>
                  <p className="text-base sm:text-lg">{userDetails.email}</p>
                </div>

                <div>
                  <h2 className="text-gray-600 mb-1 text-sm sm:text-base">
                    Address
                  </h2>
                  <p className="italic text-gray-500 text-base sm:text-lg">
                    Address not set
                  </p>
                </div>

                <div>
                  <h2 className="text-gray-600 mb-1 text-sm sm:text-base">
                    Mobile
                  </h2>
                  <p className="italic text-gray-500 text-base sm:text-lg">
                    Not provided
                  </p>
                </div>

                <div>
                  <h2 className="text-gray-600 mb-1 text-sm sm:text-base">
                    Date Joined
                  </h2>
                  <p className="italic text-gray-500 text-base sm:text-lg">
                    {userDetails.created_at}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Wish List */}
          <div className={`${navBar[1].isActive ? "block" : "hidden"}`} id="wishlist">
            <WishList wishList={userDetails.wishList} />
          </div>

          {/* Orders */}
          <div className={`${navBar[2].isActive ? "block" : "hidden"}`} id="orders">
            <Order />{" "}
            {/* Assuming Orders component will handle user's orders */}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            You are not logged in
          </h1>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
