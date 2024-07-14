import React, { useContext, useState } from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling
import { SearchContext } from './Search';
import PinterestLoginOverlay from './PinterestLoginOverlay';
import PinterestAlert from './Pinterestalert'; // Import PinterestAlert component
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, isLoggedIn, close, setClose, onLogin, onLogout }) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const navigate = useNavigate();

  // Handler for updating searchTerm
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Perform search or update products based on new searchTerm
  };

  // Handler for logging out
  const handleLogout = (e) => {
    e.preventDefault();
    onLogout(); // Perform logout logic
    setShowLogoutAlert(true); // Show logout alert
    setTimeout(() => {
      setShowLogoutAlert(false); // Hide alert after 3 seconds
    }, 3000);
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <img src="/Myntra.png" alt="Myntra Logo" className="logo" />
      </div>
      <div className="center-section">
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="right-section">
        {user ? (
          <>
            <button onClick={() => navigate('/')}>
              <img src="/search.png" alt="Search Icon" className="search-icon" />
            </button>
            <button onClick={handleLogout} className="logout-button">
              <img src="/pinterest.png" alt="Pinterest Icon" className="pinterest-icon" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/')}>
              <img src="/search.png" alt="Search Icon" className="search-icon" />
            </button>
            <button onClick={(e) =>{ e.preventDefault(); setClose(true)}} className="logout-button">
              <img src="/pinterest.png" alt="Pinterest Icon" className="pinterest-icon" />
            </button>
          </>
        )}
      </div>
      {close && <PinterestLoginOverlay close={close} setClose={setClose} onLogin={onLogin} />}
      {showLogoutAlert && <PinterestAlert message="Successfully logged out!" onClose={() => setShowLogoutAlert(false)} />}
    </div>
  );
};

export default Navbar;
