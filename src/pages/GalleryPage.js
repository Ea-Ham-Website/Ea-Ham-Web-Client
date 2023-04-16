import React from "react";
import LayoutGallery from "../Gallery/LayoutGallery";
import NavBar from "../frontend components/Navbar";
import Footer from "../frontend components/Footer";
const GalleryPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div>
        <LayoutGallery />
      </div>
      <Footer/>
    </>
  );
};

export default GalleryPage;
