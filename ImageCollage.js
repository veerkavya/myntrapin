import React, { useState, useEffect, useContext } from 'react';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ImageCollage.css';
import './Overlay.css';
import Overlay from './Overlay';
import { SearchContext } from './Search'; // Import the SearchContext
import { Link } from 'react-router-dom';

function ImageCollage({ user,images }) {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  const { setSearchTerm } = useContext(SearchContext); // Access setSearchTerm from context
  const [oV, setOV] = useState(false);

  const hButtonClick = () => {
    setOV(oV => !oV);
  };

  const handleSearchIconClick = (title) => {
    setSearchTerm(title.title); 
    setOV(oV => !oV);// Set the search term in context
  };

  useEffect(() => {
    console.log("lmlm",images);
  }, [oV,images]);

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <button
          className="bbtn"
          onClick={hButtonClick}
        >
          <h2>Pinterest Trending Collections!</h2>
        </button>

        {images.map((image, index) => (
          <div key={index} className="masonry-item">
            <img src={image.image_url} alt={`img-${index}`} />
            <div className="overlay-buttons">
            <Link to={`/product/${image.myntraid}`} className="product-button">
                <button className="iml">
                  <img src="./mlogo.png" alt="Logo" />
                
                </button>
              </Link>

              <button
                className="colo"
                onClick={() => handleSearchIconClick(image)} // Set search term on click
              >
                <FontAwesomeIcon icon={faSearch} size="2x" />
              </button>
            </div>
          </div>
        ))}
      </Masonry>

      {oV && (
        <Overlay>
          <button className="close" onClick={hButtonClick}>X</button>
          <h2 className="yp">Your Pins..</h2>
          <div className="msg">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column mgc"
            >
              {images.map((image, index) => (
                <div key={index} className="masonry-item">
                  <img src={image.image_url} alt={`img-${index}`} />
                  <div className="overlay-buttons">
                    {image.myntra && (
                      <Link to={`/product/${image.myntraid}`} className="product-button">
                      <button className="iml">
                        <img src="./mlogo.png" alt="Logo" />
                    
                      </button>
                    </Link>
                    )}
                    <button
                      className="colo"
                      onClick={() => handleSearchIconClick(image)} // Set search term on click
                    >
                      <FontAwesomeIcon icon={faSearch} size="2x" />
                    </button>
                  </div>
                  <h4>{image.title}</h4>
                </div>
              ))}
            </Masonry>
          </div>
        </Overlay>
      )}
    </div>
  );
}

export default ImageCollage;
