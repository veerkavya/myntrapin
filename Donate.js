import React, { useState } from 'react';
import './Donate.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const [showR, setR] = useState(0);

  const [formData, setFormData] = useState({
    image: '',
    type: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    console.log('Form Data Submitted:', formData);
    setShowSuccessAlert2(true);
    setR(prev=>prev+20);
    // Navigate back to home page after 3 seconds
    setTimeout(() => {
        setShowSuccessAlert2(false);
    
    }, 3000);
    setTimeout(() => navigate(`/`), 1000);
    // Reset form fields after submission
    setFormData({
      image: '',
      type: '',
      address: '',
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();


  return (
    <div className="donation-container">
      <div className="image-preview">
        {formData.image ? (
          <img src={formData.image} alt="Uploaded" className="uploaded-image" />
        ) : (
          <div className="upload-placeholder">Upload Image</div>
        )}
      </div>
      <div className="form-container">
        <h2>Donate Your Used Clothes</h2>
        <h5>Total Rewards ${showR}</h5>
        <form className="donation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type of Clothing:</label>
          
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Pickup Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" onSubmit={handleSubmit} className="submit-button">
            Submit Donation
          </button>
        </form>
      </div>
      {showSuccessAlert2 && (
        <div className="alert2 success2">
          Congrats!!! You earned the rewards...
        </div>
      )}
    </div>
    
  );
};

export default DonationPage;
