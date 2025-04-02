import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Hide pagination if only one page

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-200"
        }`}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => handlePageChange(idx + 1)}
          className={`px-3 py-1 rounded ${
            idx + 1 === currentPage ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          {idx + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-200"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
