import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr';
import BreadCrumb from '../components/BreadCrumb';
import ProductDetails from '../components/ProductDetails';

const fetcher = (url) => fetch(url, { method: "GET" }).then((res) => res.json());

const ProductDetailsPage = () => {
  const ProductId = useParams();

  console.log(ProductId);

  const [fetchUrl, setFetchUrl] = useState(`${import.meta.env.VITE_APP_API_URL}/products/${ProductId.id}`);

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  console.log(data);
  return (
   <>
    {isLoading ? 
      <div>Loading...</div> 
      : 
      <div>
      <BreadCrumb link="Product Details" path={`/product/${ProductId.id}`} />
      <ProductDetails product={data} />
    </div>}
   </>
  )
}

export default ProductDetailsPage;