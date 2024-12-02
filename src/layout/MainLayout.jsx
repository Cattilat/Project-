import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const handlereset = () => {
     
  }
  return (
    <div>
     
     <Container className={"pt-28"}>
        <Header />
        <Outlet />
       
      </Container>
      <Toaster />
    </div>
  );
};

export default MainLayout;
