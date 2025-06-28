import type { AcademicYearData } from '@/pages/admin/tools/CreateAcademicYear';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import type { AcademicTermData } from '@/pages/admin/tools/CreateAcademicTerm';
import type { ClassLevelData } from '@/pages/admin/tools/CreateClassLevel';
import axios from 'axios';
import type { SubjectData } from '@/pages/admin/tools/CreateSubject';

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

    // Check if it's an axios error with response data
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
      toast.error(message);
    } else if (error instanceof Error) {
      message = error.message;
      toast.error(message);
    } else {
      toast.error(message);
    }

    console.log('Error message:', message);
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

    // Check if it's an axios error with response data
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
      toast.error(message);
    } else if (error instanceof Error) {
      message = error.message;
      toast.error(message);
    } else {
      toast.error(message);
    }

    console.log('Error message:', message);
  }
};

export const createClassLevel = async (formData: ClassLevelData) => {
  try {
    const { data } = await api.post('/api/admin/create-class-level', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    let message = 'An unexpected error occurred';

    // Check if it's an axios error with response data
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
      toast.error(message);
    } else if (error instanceof Error) {
      message = error.message;
      toast.error(message);
    } else {
      toast.error(message);
    }

    console.log('Error message:', message);
  }
};

export const createSubject = async (formData: SubjectData) => {
  try {
    const { data } = await api.post('/api/admin/create-subject', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    let message = 'An unexpected error occurred';

    // Check if it's an axios error with response data
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
      toast.error(message);
    } else if (error instanceof Error) {
      message = error.message;
      toast.error(message);
    } else {
      toast.error(message);
    }

    console.log('Error message:', message);
  }
};
