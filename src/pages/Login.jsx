import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import reactUseCookie from "react-use-cookie";
import toast from "react-hot-toast";
import useLogin from "../store/useLogin";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [token, setToken] = reactUseCookie("token");
  const [user, setUser] = reactUseCookie("user");

  const [loading, setLoading] = useState(false);
  const { isLogin, setIsLogin } = useLogin();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const handleForm = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        setToken(json.token); // Store token
        setUser(JSON.stringify(json.user)); // Store user details
        setIsLogin(true);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(json.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full">
        <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register("terms", {
                      required: "You must accept the terms and conditions",
                    })}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-800">
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-blue-500 hover:underline"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
              >
                Login
                {loading && (
                  <span className="loader"></span> // Replace this with your spinner/loader
                )}
              </button>

              {/* Redirect to Sign Up */}
              <p className="text-sm font-light text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signUp"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
