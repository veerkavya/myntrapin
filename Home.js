import React from 'react';
import { useState, useEffect } from 'react';
import ImageCollage from './ImageCollage';
import ProductList from './ProductList';
import Footer from './Footer';
const images = [
    // Add the URLs of the images you want to display in the collage
    'https://i.pinimg.com/originals/6c/66/47/6c6647f3fad479456f800c976fb1080f.jpg',
    "/cof6.png",
    "https://i.pinimg.com/originals/4a/8d/11/4a8d115b98f4a541af0a6978df41b474.jpg",
    "/cof6.png","https://i.pinimg.com/originals/4a/8d/11/4a8d115b98f4a541af0a6978df41b474.jpg",,"https://i.pinimg.com/originals/4a/8d/11/4a8d115b98f4a541af0a6978df41b474.jpg",,"https://i.pinimg.com/originals/4a/8d/11/4a8d115b98f4a541af0a6978df41b474.jpg","https://i.pinimg.com/originals/4a/8d/11/4a8d115b98f4a541af0a6978df41b474.jpg",
   "/cof6.png",,"https://i.pinimg.com/564x/64/1d/72/641d72d4bde1945b728a3f763ad92d3b.jpg","https://i.pinimg.com/564x/64/1d/72/641d72d4bde1945b728a3f763ad92d3b.jpg","https://i.pinimg.com/564x/64/1d/72/641d72d4bde1945b728a3f763ad92d3b.jpg","https://i.pinimg.com/564x/64/1d/72/641d72d4bde1945b728a3f763ad92d3b.jpg","https://i.pinimg.com/564x/64/1d/72/641d72d4bde1945b728a3f763ad92d3b.jpg","https://i.pinimg.com/564x/64/1d/72/641d72d4bde1945b728a3f763ad92d3b.jpg"
  ];
  
const Home = ({wish,setwish,isLoggedIn,user,images,Ps,setPs,setImages,overlayVisible,setOverlayVisible,activeButton,setActiveButton}) => {
  
    return (
       <div> 
        {isLoggedIn && <div className='cover'> <div className="banner-container">
       <ImageCollage user={user} images={images} />
       </div></div> }
      <div className="content">
      
      <h2  className='hh'>Trending Now!</h2>
        <ProductList user={user} Ps={Ps}  setPs={setPs}/>
     
  
      </div>
      <Footer wish={wish} setwish={setwish} isLoggedIn={isLoggedIn} user={user} images={images}  Ps={Ps} setImages={setImages} overlayVisible={overlayVisible}  setOverlayVisible={setOverlayVisible} activeButton={activeButton} setActiveButton={ setActiveButton}/></div>
    );
  };
  
  export default Home;



