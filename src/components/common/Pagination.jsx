import React from 'react';
import { usePagination } from '../../hooks/usePagination';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
   <ul className=" inline-flex items-center justify-center gap-1 md:gap-2 mt-8  bg-primary text-white rounded-full p-1.5 md:p-2
         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg 
    ">
      
      {/* Tombol Previous */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-full  w-8 h-8 md:w-auto md:py-5 md:px-5 text-sm md:text-base transition-colors duration-150
       bg-white text-primary-dark hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-semibold text-[18px]
      `}
      >
        <span className="md:hidden">&lt;</span>
        <span className="hidden md:inline">Previous</span>
      </button>

      {/* Nomor Halaman */}
      {paginationRange.map((pageNumber, index) =>
        pageNumber === '...' ? (
          <span
            key={index}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-white text-sm"
          >
            &#8230;
          </span>
        ) : (
          <button
            key={index}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10  text-sm md:text-base transition-colors duration-150
              ${pageNumber === currentPage
                ? 'bg-white text-primary-dark font-semibold text-[18px]' 
                : 'bg-transparent text-white hover:bg-white/20' 
              }`}
          >
            {pageNumber}
          </button>
        )
      )}

      {/* Tombol Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === lastPage}
        className={`flex items-center justify-center rounded-full w-8 h-8 md:w-auto md:py-5 md:px-6 text-sm md:text-base transition-colors duration-150
       bg-white text-primary-dark hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-semibold text-[18px]
        `}
      >
        <span className="md:hidden">&gt;</span>
        <span className="hidden md:inline">Next</span>
      </button>
    </ul>
  );
};

export default Pagination;