import { useState, useMemo } from 'react';

const usePagination = (initialPage, totalPages) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [range, setRange] = useState({ start: 0, end: 10 });

  const pagesArray = useMemo(() => {
    return totalPages > 1
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [];
  }, [totalPages]);

  const handleNextRange = () => {
    setRange(prevRange => ({
      start: prevRange.end,
      end: Math.min(prevRange.end + 10, totalPages),
    }));
  };

  const handlePrevRange = () => {
    setRange(prevRange => ({
      start: Math.max(prevRange.start - 10, 0),
      end: prevRange.start,
    }));
  };

  const nextPage = () => {
    if (currentPage + 1 > range?.end < totalPages) {
      setRange(prevRange => ({
        start: prevRange.end,
        end: Math.min(prevRange.end + 10, totalPages),
      }));
    }
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    if (currentPage - 1 < range?.start + 1 > 0) {
      setRange(prevRange => ({
        start: Math.max(prevRange.start - 10, 0),
        end: prevRange.start,
      }));
    }
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const setPage = page => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return [
    currentPage,
    nextPage,
    prevPage,
    setPage,
    pagesArray,
    range,
    handleNextRange,
    handlePrevRange,
  ];
};

export default usePagination;
