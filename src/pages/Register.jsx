import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import reactUseCookie from "react-use-cookie";
import useSWR from "swr";

const Register = () => {
    // const fetcher = (url) => fetch(url).then((res) => res.json());

//   const [fetchUrl, setFetchUrl] = useState(`${import.meta.env.VITE_APP_API_URL}/user`);
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  const [user, setUser] = reactUseCookie('user');
  const [token,setToken] = reactUseCookie('token');

//   const {data, isLoading, error} = useSWR(fetchUrl, fetcher);
  const handleForm = async (formData) => {
    try {
      console.log("Submitting Data:", formData);
  
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
        return;
      }
  
      const json = await response.json();
      toast.success("Registration successful!");
      console.log(json.user);
      console.log(json.token);
      setUser(JSON.stringify(json.user));
      reset();
  
    } catch (err) {
      console.error("Network Error:", err);
      toast.error("Network error occurred. Please try again.");
    }
  };
  
  return (
<section className="h-screen overflow-hidden">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full">
    <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
      <div className="p-6 space-y-6 sm:p-8">
        <h1 className="text-2xl font-bold leading-tight text-black">
          Create an account
        </h1>
        <form className="space-y-6" action="#" onSubmit={handleSubmit(handleForm)}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Your name
            </label>
            <input
              type="name"
              name="name"
              {...register("name")}
              className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password")}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirm-password"
              {...register("password_confirmation")}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-medium text-gray-800"
              >
                I accept the{" "}
                <a
                  className="text-blue-500 hover:underline"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>


  );
};

export default Register;
