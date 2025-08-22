import { useState, useEffect, useCallback } from 'react';

interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UsePaginatedDataResult<T> {
  data: T[];
  pagination: PaginationOptions;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePaginatedData<T>(
  fetchFunction: (page: number, limit: number) => Promise<{ data: T[]; pagination: PaginationOptions }>,
  initialLimit: number = 12
): UsePaginatedDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number = pagination.page) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchFunction(page, pagination.limit);
      setData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error('Erreur fetchData:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, pagination.limit]);

  useEffect(() => {
    fetchData(1);
  }, [fetchFunction, pagination.limit]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchData(page);
    }
  };

  const nextPage = () => {
    if (pagination.page < pagination.totalPages) {
      goToPage(pagination.page + 1);
    }
  };

  const prevPage = () => {
    if (pagination.page > 1) {
      goToPage(pagination.page - 1);
    }
  };

  const refresh = () => {
    fetchData(pagination.page);
  };

  return {
    data,
    pagination,
    isLoading,
    error,
    refresh,
    goToPage,
    nextPage,
    prevPage,
  };
}