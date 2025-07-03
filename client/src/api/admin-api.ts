import type { AcademicYearData } from '@/pages/admin/tools/CreateAcademicYear';
import api, { handleApiError } from '../lib/axios';
import toast from 'react-hot-toast';
import type { AcademicTermData } from '@/pages/admin/tools/CreateAcademicTerm';
import type { ClassLevelData } from '@/pages/admin/tools/CreateClassLevel';
import type { SubjectData } from '@/pages/admin/tools/CreateSubject';
import type { CourseData } from '@/pages/admin/tools/CreateCourse';

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
  } catch (error) {
    handleApiError(error);
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
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAcademicTerms = async () => {
  try {
    const { data } = await api.get('/api/admin/academic-terms');
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchClassLevels = async () => {
  try {
    const { data } = await api.get('/api/admin/class-levels');
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchSubjects = async () => {
  try {
    const { data } = await api.get('/api/admin/subjects');
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = async (formData: CourseData) => {
  try {
    const { data } = await api.post('/api/admin/create-course', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchCourses = async () => {
  try {
    const { data } = await api.get('/api/admin/courses');
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
