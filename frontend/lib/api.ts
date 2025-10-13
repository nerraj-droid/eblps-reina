import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const businessPermitsApi = {
  // Get all business permits with pagination and search
  getAll: (params?: { page?: number; search?: string; status?: string }) => 
    api.get('/business-permits', { params }),
  
  // Get single business permit
  getById: (id: string) => 
    api.get(`/business-permits/${id}`),
  
  // Create new business permit application
  create: (data: Record<string, unknown>) => 
    api.post('/business-permits', data),
  
  // Update business permit
  update: (id: string, data: Record<string, unknown>) => 
    api.put(`/business-permits/${id}`, data),
  
  // Delete business permit
  delete: (id: string) => 
    api.delete(`/business-permits/${id}`),
  
  // Approve business permit
  approve: (id: string) => 
    api.post(`/business-permits/${id}/approve`),
  
  // Reject business permit
  reject: (id: string, reason?: string) => 
    api.post(`/business-permits/${id}/reject`, { reason }),
};

export const applicationsApi = {
  // Get all applications
  getAll: (params?: { page?: number; search?: string; status?: string }) => 
    api.get('/applications', { params }),
  
  // Get single application
  getById: (id: string) => 
    api.get(`/applications/${id}`),
  
  // Create new application
  create: (data: Record<string, unknown>) => 
    api.post('/applications', data),
  
  // Update application
  update: (id: string, data: Record<string, unknown>) => 
    api.put(`/applications/${id}`, data),
  
  // Submit application for review
  submit: (id: string) => 
    api.post(`/applications/${id}/submit`),
};

export const constituentsApi = {
  // Get all constituents
  getAll: (params?: { page?: number; search?: string }) => 
    api.get('/constituents', { params }),
  
  // Get single constituent
  getById: (id: string) => 
    api.get(`/constituents/${id}`),
  
  // Create new constituent
  create: (data: Record<string, unknown>) => 
    api.post('/constituents', data),
  
  // Update constituent
  update: (id: string, data: Record<string, unknown>) => 
    api.put(`/constituents/${id}`, data),
  
  // Delete constituent
  delete: (id: string) => 
    api.delete(`/constituents/${id}`),
};


export const psicApi = {
  // Get all PSIC codes with pagination and search
  getAll: (params?: { page?: number; search?: string; per_page?: number }) => 
    api.get('/psic', { params }),
  
  // Get single PSIC code
  getById: (id: string) => 
    api.get(`/psic/${id}`),
  
  // Search PSIC codes
  search: (query: string) => 
    api.get('/psic/search', { params: { q: query } }),
};

export const reportsApi = {
  // Get dashboard statistics
  getDashboardStats: () => 
    api.get('/reports/dashboard'),
  
  // Get applications report
  getApplicationsReport: (params?: { startDate?: string; endDate?: string }) => 
    api.get('/reports/applications', { params }),
  
  // Get revenue report
  getRevenueReport: (params?: { startDate?: string; endDate?: string }) => 
    api.get('/reports/revenue', { params }),
  
  // Get processing time report
  getProcessingTimeReport: (params?: { startDate?: string; endDate?: string }) => 
    api.get('/reports/processing-time', { params }),
};

export default api;
