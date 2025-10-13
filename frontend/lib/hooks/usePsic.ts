import { useState, useEffect, useCallback } from 'react';
import { psicApi } from '@/lib/api';

export interface PsicCode {
  id: number;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PsicSearchResult {
  data: PsicCode[];
  message: string;
}

export interface PsicPaginatedResult {
  data: PsicCode[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message: string;
}

export function usePsic() {
  const [psicCodes, setPsicCodes] = useState<PsicCode[]>([]);
  const [searchResults, setSearchResults] = useState<PsicCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPsicCodes = useCallback(async (params?: { page?: number; search?: string; per_page?: number }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await psicApi.getAll(params);
      const result: PsicPaginatedResult = response.data;
      setPsicCodes(result.data);
      return result;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch PSIC codes';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPsicCodes = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchQuery(query);
    
    try {
      const response = await psicApi.search(query);
      const result: PsicSearchResult = response.data;
      setSearchResults(result.data);
      return result;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to search PSIC codes';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPsicById = useCallback(async (id: number) => {
    try {
      const response = await psicApi.getById(id.toString());
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch PSIC code';
      setError(errorMessage);
      throw error;
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchQuery('');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load initial PSIC codes on mount
  useEffect(() => {
    fetchPsicCodes({ per_page: 100 });
  }, [fetchPsicCodes]);

  return {
    psicCodes,
    searchResults,
    loading,
    error,
    searchQuery,
    fetchPsicCodes,
    searchPsicCodes,
    getPsicById,
    clearSearch,
    clearError,
  };
}
