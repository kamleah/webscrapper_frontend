import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-700 hover:bg-gray-300 rounded-full p-2">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-2xl" />
          
        </div>
        <p className="text-center text-lg mb-6">Are you sure you want to Logout</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-500  text-gray-700  px-6 py-2 rounded">
            No, cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700  text-white px-6 py-2 rounded">
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
