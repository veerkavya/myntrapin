import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { SearchProvider } from './Search';

const ProductCard = ({ product }) => {
 
  return (
    <div className="product-card">
      <Link
        to={{ pathname: `/product/${product.id}`}} // Pass product as state
        className="product-button"
        // Handle product click to set in context
      >
        <img src={product.image_url} alt={product.name} />
        <div className="product-info">
          <h3>{product.title}</h3>
          <p>{product.category}</p>
          <div className="product-rating">
            <span>⭐{product.rating}</span>
            
          </div>
          <div className="product-price">${product.price}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
