import { defineStore } from 'pinia';
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

export const usePsicStore = defineStore('psic', {
  state: () => ({
    psicCodes: [] as PsicCode[],
    searchResults: [] as PsicCode[],
    loading: false,
    error: null as string | null,
    searchQuery: '',
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  }),

  getters: {
    getPsicByCode: (state) => (code: string) => {
      return state.psicCodes.find(psic => psic.code === code);
    },
    
    getPsicById: (state) => (id: number) => {
      return state.psicCodes.find(psic => psic.id === id);
    },

    filteredPsicCodes: (state) => {
      if (!state.searchQuery) return state.psicCodes;
      
      const query = state.searchQuery.toLowerCase();
      return state.psicCodes.filter(psic => 
        psic.code.toLowerCase().includes(query) ||
        psic.description.toLowerCase().includes(query)
      );
    },
  },

  actions: {
    async fetchPsicCodes(params?: { page?: number; search?: string; per_page?: number }) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await psicApi.getAll(params);
        const result: PsicPaginatedResult = response.data;
        
        this.psicCodes = result.data;
        this.currentPage = result.meta.current_page;
        this.totalPages = result.meta.last_page;
        this.totalItems = result.meta.total;
        
        return result;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error 
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
          : 'Failed to fetch PSIC codes';
        this.error = errorMessage || 'Failed to fetch PSIC codes';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async searchPsicCodes(query: string) {
      if (query.length < 2) {
        this.searchResults = [];
        return;
      }

      this.loading = true;
      this.error = null;
      this.searchQuery = query;
      
      try {
        const response = await psicApi.search(query);
        const result: PsicSearchResult = response.data;
        
        this.searchResults = result.data;
        return result;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error 
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
          : 'Failed to search PSIC codes';
        this.error = errorMessage || 'Failed to search PSIC codes';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getPsicById(id: number) {
      try {
        const response = await psicApi.getById(id.toString());
        return response.data.data;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error 
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
          : 'Failed to fetch PSIC code';
        this.error = errorMessage || 'Failed to fetch PSIC code';
        throw error;
      }
    },

    clearSearch() {
      this.searchResults = [];
      this.searchQuery = '';
    },

    setError(error: string | null) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    },
  },
});
