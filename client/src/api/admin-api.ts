import type { AcademicYearData } from '@/pages/admin/tools/CreateAcademicYear';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import type { AcademicTermData } from '@/pages/admin/tools/CreateAcademicTerm';

export const fetchPendingRequests = async (params: URLSearchParams) => {
  try {
    const { data } = await api.get(`/api/admin/pending-requests?${params}`);
    if (data.success) {
      return data.requestData;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const approvePendingRequest = async (requestId: string) => {
  const { data } = await api.put('/api/admin/approve-request', {
    requestId,
  });
  return data;
};

export const rejectPendingRequest = async (requestId: string) => {
  const { data } = await api.put('/api/admin/reject-request', {
    requestId,
  });
  return data;
};

export const createAcademicYear = async (formData: AcademicYearData) => {
  try {
    const { data } = await api.post(
      '/api/admin/create-academic-year',
      formData
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(message);
  }
};

export const fetchAcademicYears = async () => {
  try {
    const { data } = await api.get('/api/admin/academic-years');
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const createAcademicTerm = async (formData: AcademicTermData) => {
  try {
    const { data } = await api.post(
      '/api/admin/create-academic-term',
      formData
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(message);
  }
};
