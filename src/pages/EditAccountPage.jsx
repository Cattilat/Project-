import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { Link } from "react-router-dom";
import Select from "react-select";
import reactUseCookie from "react-use-cookie";
import useSWR from "swr";

const EditAccountPage = () => {
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

  const [fetchUrl] = useState(`https://restcountries.com/v3.1/all`);
  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);
  

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [user,setuser] = reactUseCookie('user');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
  const options = sortedData.map((country) => ({
    value: country.idd.root + (country.idd.suffixes?.[0] || ""),
    label: (
      <div className="flex items-center gap-2">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-5 h-5"
        />
        <span>{country.name.common}</span>
      </div>
    ),
    flag: country.flags.svg,
    name: country.name.common,
    phoneCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "150px", 
    }),
    menu: (provided) => ({
      ...provided,
      width: "300px",
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px",
      backgroundColor: state.isFocused ? "#e6f7ff" : "#fff",
    }),
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setPhoneNumber(selectedOption ? `${selectedOption.phoneCode} ` : "");
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const userProfile = JSON.parse(user);


  return (
    <div className="w-1/2 mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl text-center font-bold mb-6">
        Edit Profile
      </h1>
      <div className="relative mb-20 sm:mb-24 bg-slate-50">
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <img
                  src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
                  alt="Forest in mist"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 bg-black rounded-full p-2"><HiPencil className=" text-white" /></button>
              </div>

              {/* Profile Avatar */}
              <div className="absolute -bottom-16 sm:-bottom-20 left-4 sm:left-8">
              <div className="w-24 relative h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#C6176C] flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl font-semibold">
                  {userProfile.name.charAt(0).toUpperCase()}
                  <button className="absolute bottom-0 right-2 bg-black rounded-full p-2"><HiPencil className=" text-white size-3" /></button>
               
               </div>
                </div>

              </div>


      <div className="max-w-3xl mx-auto mt-16 space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              defaultValue={userProfile.name}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={userProfile.email}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address{" "}
              <span className="text-gray-500 text-sm">
                (Will be used for checkout)
              </span>
            </label>
            <input
              type="text"
              name="address"
              
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your address"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-3">
                <Select
                  options={options}
                  onChange={handleCountryChange}
                  styles={customStyles}
                  className="react-select-container"
                  classNamePrefix={"react-select"}
                />
              </div>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
            <Link to={"/account"}
              type="button"
              className="w-full sm:w-auto px-6 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Profile
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountPage;
