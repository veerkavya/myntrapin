import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({wish,setwish,isLoggedIn,user, images,Ps,setImages,overlayVisible, setOverlayVisible, activeButton, setActiveButton }) => {
    const { productId } = useParams(); // Access productId from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showSuccessAlert3, setShowSuccessAlert3] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(user);
            console.log(isLoggedIn);

            try {
                const response = await fetch(`http://127.0.0.1:5000/products/${productId}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data); // Update state with fetched product
                setLoading(false); // Update loading state
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false); // Update loading state in case of error
            }
        };

        fetchProduct();
    }, [productId]); // Fetch product whenever productId changes

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
    }

    const handleButtonClick = (buttonName,btn) => {
        console.log("wish2",btn)
        setwish(btn);
        setActiveButton(buttonName);
        setOverlayVisible(prev => !prev); // Toggle overlay visibility
    };
    const addwish=(e)=>{
        setShowSuccessAlert3(true);
        setTimeout(() => {
            setShowSuccessAlert3(false);
        
        }, 2000);
    }
    return (
   <div>
            <div className="product-card2">
                <div className="product-image-container2">
                    <img src={product.image_url} className="product-image2" alt={product.title} />
                    <div className="product-details2">
                        <span className="product-price2">${product.price}</span>
                        <span className="product-rating2">⭐{product.rating}</span>
                    </div>
                </div>
                <div className="product-info2">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                </div>
                <div className="product-actions2">
                    {user&&(<><button
                        className={`footer-item kk ${overlayVisible ? 'active' : ''}`}
                        onClick={() => handleButtonClick("pin",true)}
                    >
                        Wishlist
                    </button>
                    <button
                        className={`footer-item k2 ${overlayVisible ? 'active' : ''}`}
                        onClick={() => handleButtonClick("pin",false)}
                    >
                        Add to Cart
                    </button></>)}
                    {!user&&(<><button
                        className={`footer-item kk`} onClick={addwish}
                       
                    >
                        Wishlist
                    </button>
                    <button onClick={() => navigate(`/billing/${product.id}`)}
                        className={`footer-item k2 `}
                        
                    >
                        Add to Cart
                    </button></>)}
                </div>
            </div>
            {showSuccessAlert3 && (
        <div className="alert2 success2">
          successfully added to wishlist!
        </div>
      )}
            <Footer wish={wish} setwish={setwish} user={user}
                images={images} Ps={Ps} setImages={setImages}
                overlayVisible={overlayVisible}
                setOverlayVisible={setOverlayVisible}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
        </div>
    );
};

export default Cart;
