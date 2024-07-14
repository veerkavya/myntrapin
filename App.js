import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Navbar from './Navbar';
import Billing from './Billing';
import Donate from './Donate';

import PinterestLoginOverlay from './PinterestLoginOverlay';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState("");
  const [close, setClose] = useState(false);
  const [wish, setwish] = useState(false);

  useEffect(() => {
    fetchImages();  // Fetch images when component mounts
  }, [user]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/users/7/pins'); // Replace with your Flask route
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      console.log("pins",data);
      setImages(data); // Assuming the response data structure is { images: [...] }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
    useEffect(() => {
        console.log(overlayVisible);
      }, [overlayVisible]);


      const [Ps, setPs] = useState([]);

     
    
      const fetchproducts= async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/products'); // Replace with your Flask route
          if (!response.ok) {
            throw new Error('Failed to fetch images');
          }
          const data = await response.json();
          console.log("d",data);
          setPs(data); // Assuming the response data structure is { images: [...] }
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      useEffect(() => {
        fetchproducts();  // Fetch images when component mounts
      }, []);
  useEffect(() => {
    console.log(overlayVisible);
  }, [overlayVisible]);

  
  const handleLogin = async (email) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/search?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      if (data.user_id) {
        setUser(data.user_id);
        setIsLoggedIn(true);
        setClose(false);
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    setUser("");
  
  }
 





  return (
    <div className="App">
      <BrowserRouter>
      <Navbar user={user} isLoggedIn={isLoggedIn} close={close} setClose={setClose} onLogin={handleLogin} onLogout={handleLogout} />
      
        <Routes>
        <Route path="/" element={<Home wish={wish} setwish={setwish} isLoggedIn={isLoggedIn} user={user} images={images} Ps={Ps} setPs={setPs} setImages={setImages} overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} activeButton={activeButton} setActiveButton={ setActiveButton}/>} />
        <Route path="/product/:productId" element={<Cart wish={wish} setwish={setwish} isLoggedIn={isLoggedIn} user={user} images={images} Ps={Ps} setImages={setImages} overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} activeButton={activeButton} setActiveButton={ setActiveButton} />} />
        <Route path="/billing/:productId" element={<Billing  Ps={Ps} overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} activeButton={activeButton}/>} />
        <Route path="/donate" element={<Donate />} />

       </Routes>
       
      
      </BrowserRouter>
      {close && <PinterestLoginOverlay close={close} setClose={setClose} onLogin={handleLogin} />}

    </div>
  );
}

export default App;
