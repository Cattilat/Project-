import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

const CustomerMessagePage = () => {
  const fetcher = (url) =>
    fetch(url, { method: "GET" }).then((res) => res.json());

  const [fetchUrl, setFetchUrl] = useState(
    `${import.meta.env.VITE_APP_API_URL}/show`
  );
  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);


  const {mutate} = useSWRConfig();

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(`${import.meta.env.VITE_APP_API_URL}/show`);
      toast.success("Message deleted successfully");
    }else{
      const json = await response.json();
      console.log(json);
      toast.error("Message deletion failed");
    }
  }

  const handleUpdate = (id) => {
    const updateId = id;

    navigate(`/contact/${updateId}`);
  }
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((item) => (
          <div className="p-4 flex items-center justify-center flex-col" key={item.id}>
            <p>{item.Customer_name}</p>
            <p>{item.Customer_email}</p>
            <p>{item.Customer_message}</p>
            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2">Delete</button>
            <button onClick={() => handleUpdate(item.id)} className="bg-blue-500 text-white mt-4 px-4 py-2">Update</button>

          </div>
        ))
      )}
    </>
  );
};

export default CustomerMessagePage;
