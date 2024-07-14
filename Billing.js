import React, { useState } from 'react';
import './Billing.css'; // Import your CSS file for styling
import { useParams, useNavigate } from 'react-router-dom';

const Billing = ({ Ps,overlayVisible,setOverlayVisible, activeButton}) => {
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const { productId } = useParams();
  const product = Ps.find(product => product.id == productId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call or any async operation
    // Here, you can perform actual form submission logic

    // Show success alert
    setShowSuccessAlert(true);
    setOverlayVisible(!overlayVisible)
    // Navigate back to home page after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="billing-container">
      <div className="left-half">
        {product && (
          <img src={product.image_url} alt={product.title} className="product-image" />
        )}
      </div>
      <div className="right-half">
        <h2>Billing Information</h2>
        <form onSubmit={handleSubmit}>
          {/* Form inputs */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={billingInfo.fullName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Other form inputs */}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      {/* Success alert */}
      {showSuccessAlert && (
        <div className="alert2 success2">
          Successfully added to cart!
        </div>
      )}
    </div>
  );
};

export default Billing;
