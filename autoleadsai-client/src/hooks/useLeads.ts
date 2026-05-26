// src/hooks/useLeads.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  sourceUrl: string;
  qualification: 'hot' | 'warm' | 'cold';
  status: string;
  intent?: { score: number };
  createdAt: string;
}

interface LeadFilters {
  search?: string;
  qualification?: string;
  status?: string;
  source?: string;
  sort?: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<LeadFilters>({});
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 1,
  });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.qualification && filters.qualification !== 'all') params.append('qualification', filters.qualification);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.source && filters.source !== 'all') params.append('source', filters.source);
      if (filters.sort) params.append('sort', filters.sort);

      const { data } = await api.get(`${API_ENDPOINTS.LEADS.BASE}?${params.toString()}`);
      setLeads(data.leads || []);
      setPagination((prev) => ({
        ...prev,
        total: data.total || 0,
        totalPages: data.pages || 1,
      }));
    } catch (err: any) {
      setError('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setFiltersAndReset = useCallback((newFilters: LeadFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return {
    leads,
    loading,
    error,
    filters,
    pagination,
    setPage,
    setFilters: setFiltersAndReset,
    clearFilters,
    refetch: fetchLeads,
  };
};