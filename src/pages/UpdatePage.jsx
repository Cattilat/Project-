import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const UpdatePage = () => {

    const {id} = useParams();
    const fetcher = (url) => fetch(url, { method: "GET" }).then((res) => res.json());

    const [fetchUrl, setFetchUrl] = useState(`${import.meta.env.VITE_APP_API_URL}/id/${id}`);
    
    const { data, isLoading, error } = useSWR(fetchUrl, fetcher);
    
    console.log(data);
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    
    const handleUpdate = async(data) => {
       
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const json = await response.json();
          if(response.ok){
            console.log(json);
            toast.success("Feedback submitted successfully!");
          }else{
            console.log(json);
            toast.error("Feedback submission failed!");
          }
    }
  return (
  <>
    {isLoading ? (<div>Loading...</div>): (   <div className="container mx-auto px-4 py-10">
        <div className="lg:flex justify-between space-x-8">
          {/* Contact Information */}
          <div className="flex-1 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> tz3435950@gmail.com
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Main St, Cityville, Country
            </p>
          </div>
    
          {/* Contact Form */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={data.Customer_name}
                  {...register("Customer_name", { required: true })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {
                  errors.Customer_name && (
                    <p className="text-red-500">This field is required</p>
                  )
                }
              </div>
    
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={data.Customer_email}
                  {...register("Customer_email", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {
                  errors.Customer_email && (
                    <p className="text-red-500">This field is required</p>
                  )
                }
              </div>
    
              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  defaultValue={data.Customer_message}
                  {...register("Customer_message", { required: true })}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit(handleUpdate)}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>)
    }
  </>
  )
}
export default UpdatePage;