// src/hooks/usePagination.ts

import { useState, useCallback, useMemo } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

export const usePagination = ({
  initialPage = 1,
  initialLimit = 25,
  total = 0,
}: PaginationOptions = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  }, [totalPages]);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setPage(1);
    setLimit(initialLimit);
  }, [initialLimit]);

  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    reset,
    hasNext,
    hasPrev,
    isFirstPage: page === 1,
    isLastPage: page === totalPages,
  };
};