import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { SearchContext } from './Search';

const ProductList = ({ user,Ps,setPs }) => {
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
   
      fetchProducts();
     
     
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      if (searchTerm!=''){ const response = await fetch(`http://127.0.0.1:5000/search/products?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log("gggggggggggg",data);   
      setPs(data); }
      else{
        setPs(Ps);
      }// Update parent state if needed
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="product-list">
      {Ps.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
