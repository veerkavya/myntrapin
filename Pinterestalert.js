import React from 'react';
import './Pinterestalert.css'; // CSS for styling alert

const PinterestAlert = ({ message, onClose }) => {
  return (
    <div className="pinterest-alert2">
      <div className="alert-content21">
        <span className="alert-message2">{message}</span>
        
      </div>
    </div>
  );
};

export default PinterestAlert;
