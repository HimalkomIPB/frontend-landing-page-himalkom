import { useMemo } from 'react';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export const usePagination = ({
  totalPages,
  currentPage,
  siblingCount = 1, 
}) => {
  return useMemo(() => {
    const totalPageNumbersToShow = siblingCount + 5;


    if (totalPages <= totalPageNumbersToShow) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;


    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

 
    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

i
    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    
    return range(1, totalPages);
  }, [totalPages, currentPage, siblingCount]);
};