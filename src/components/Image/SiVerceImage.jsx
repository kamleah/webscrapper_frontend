import React, { useState } from 'react';
import square_logo from '../../assets/logo/siverce_logo.png';
import landscape_logo from '../../assets/logo/siverce_logo_landscape.png';

const SiVerceImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  const handleDefaultImageError = () => {
    console.error('Default image failed to load');
  };

  return (
    <img
      src={error ? square_logo : src}
      alt={alt}
      className={`${className} ${loaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={handleImageLoaded}
      onError={error ? handleDefaultImageError : handleImageError}
      loading="lazy"
    />
  );
};

export default SiVerceImage;
