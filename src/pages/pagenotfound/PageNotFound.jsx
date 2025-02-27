// src/components/PageNotFound.js

import React from 'react';
import {  useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-700 mb-4">404</div>
        <div className="text-2xl font-semibold text-gray-600 mb-8">
          Page Not Found
        </div>
        <button
          onClick={handleBackToHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
