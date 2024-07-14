import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faShoppingCart, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import Overlay from './Overlay';
import './Overlay.css';
import BoxLayout from './BoxLayout';
import { Link } from 'react-router-dom';

const Footer = ({wish,setwish,isLoggedIn,user,images,Ps,setImages,overlayVisible,setOverlayVisible,activeButton, setActiveButton}) => {
 
  const handleButtonClick = (buttonName) => {
    console.log("ffff",Ps);
    setActiveButton(buttonName);
    console.log(buttonName)
    if (buttonName === 'pin') {
      setOverlayVisible(overlayVisible=>!overlayVisible,()=>{console.log(overlayVisible)}); 
      // Toggle overlay visibility
    } else {
      setOverlayVisible(false); // Hide overlay for other buttons
    }
  };
  useEffect(() => {
    console.log("llll",overlayVisible);
  }, [overlayVisible]);
  return (
   <div> <div className="footer">
      <Link
        to={{ pathname: `/`}} // Pass product as state
        className="product-button"
        // Handle product click to set in context
      ><button
      className={`footer-item ${activeButton === 'home' ? 'active' : ''}`}
      onClick={() => handleButtonClick('home')}
    >
      <FontAwesomeIcon icon={faHome} /> Home
    </button></Link>
    <Link
        to={{ pathname: `/donate`}} // Pass product as state
        className="product-button"
        // Handle product click to set in context
      > <button
        className={`footer-item ${activeButton === 'categories' ? 'active' : ''}`}
        onClick={() => handleButtonClick('categories')}
      >
        <img src="/reward.png" className='rw'></img>rewards
      </button></Link>
      <button
        className={`footer-item ${activeButton === 'cart' ? 'active' : ''}`}
        onClick={() => handleButtonClick('cart')}
      >
        <FontAwesomeIcon icon={faShoppingCart} /> My Cart
      </button>
      {user&& <button
        className={`footer-item ${overlayVisible=== true ? 'active' : ''}`}
        onClick={()=>handleButtonClick("pin")}
      >
        <FontAwesomeIcon icon={faThumbtack} /> Pin to Buy
      </button>}

     
    </div>
    
     {overlayVisible && activeButton === 'pin' && (
      <div className={`overlay cc ${overlayVisible=== true ? 'active' : ''}`}>
          <BoxLayout wish={wish} setwish={setwish} user={user} images={images} Ps={Ps} setImages={setImages}/>
      </div>
    )}</div>
  );
};

export default Footer;
