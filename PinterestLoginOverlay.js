import React, { useState } from 'react';
import './PinterestLoginOverlay.css'; // Assuming you have a CSS file for styling

const PinterestLoginOverlay = ({ close,setClose,onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(close);
    // Perform validation and submit logic
    // For demonstration, just log the email and password
    console.log('Email:', email);
   
    // Call onLogin function to notify App component about successful login
    onLogin(email);
  };

  return (
    <div className="overlay2">
      <div className="overlay-content2">
        <button className="close-button" onClick={()=>setClose(prev=>!prev)}>×</button>
        <img src="/pinterest.png" alt="Pinterest Icon" className="pinterest-icon" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email or Phone Number</label>
          <input
            type="text"
            placeholder="Enter email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default PinterestLoginOverlay;
