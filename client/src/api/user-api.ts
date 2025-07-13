import toast from 'react-hot-toast';
import api, { handleApiError } from '../lib/axios';
import type { RegisterFormData } from '../pages/auth/SignUp';
import type { SignInFormData } from '../pages/auth/SignIn';
import type { UserType } from '../types';
import axios from 'axios';
import type { ForgotPasswordData } from '@/pages/auth/ForgotPassword';
import type { ResetPasswordData } from '@/pages/auth/ResetPassword';
import type { GoalsFormData } from '@/components/common/forms/GoalsForm';

//create User
export const createUser = async (formData: RegisterFormData) => {
  try {
    const { data } = await api.post('/api/users/sign-up', formData);
    if (data.success) {
      toast.success(data.message);
      return data.newUser;
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const { data } = await api.post('/api/users/update-user', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

// user Signup
export const userLogin = async (formData: SignInFormData) => {
  try {
    const { data } = await api.post('/api/users/login', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

//complete registration
export const completeRegistration = async (formData: FormData) => {
  try {
    const { data } = await api.post(
      '/api/users/complete-registration',
      formData
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

//fetch user
export const fetchUser = async (
  setUser?: (user: UserType | null) => void,
  setAuthLoading?: (loading: boolean) => void
) => {
  try {
    setAuthLoading?.(true);
    const { data } = await api.get('/api/users/get-user');
    if (data.success) {
      const userData = data.userData;
      setUser?.(userData);
      return userData;
    }
    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status !== 401) {
        console.error('Unexpected fetchUser error:', error);
      }
    }
    setUser?.(null);
  } finally {
    setAuthLoading?.(false);
  }
};

//user validation
export const validateToken = async (
  setIsLoggedIn: (loggedIn: boolean) => void
): Promise<boolean> => {
  try {
    const response = await api.get('/api/users/validate-token');
    if (response.data) {
      setIsLoggedIn(true);
      return true;
    }
    setIsLoggedIn(false);
    return false;
  } catch (error) {
    // Only log non-401 errors
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      console.error('Token validation error:', error);
    }
    setIsLoggedIn(false);
    return false;
  }
};
//user logout
export const logout = async () => {
  const { data } = await api.post('/api/users/logout');
  if (data.success) {
    toast.success(data.message);
  } else {
    toast.error(data.message);
  }
};

export const sendOtp = async (formData: ForgotPasswordData) => {
  try {
    const { data } = await api.post('/api/users/send-otp', formData);
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const verifyOtp = async (code: string, email: string) => {
  try {
    const { data } = await api.post('/api/users/verify-otp', { code, email });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const resetPassword = async (formData: ResetPasswordData) => {
  try {
    const { data } = await api.post('/api/users/reset-password', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

//activity
export const addActivity = async (formData: FormData) => {
  try {
    const { data } = await api.post('/api/activity/add-activity', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const fetchActivities = async (params: URLSearchParams) => {
  try {
    const { data } = await api.get(`/api/activity/fetch-activities?${params}`);
    if (data.success) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const fetchActivity = async (id: string) => {
  try {
    const { data } = await api.get(`/api/activity/fetch-activity/${id}`);
    if (data.success) {
      return data.activity;
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const updateActivity = async (id: string, formData: FormData) => {
  try {
    const { data } = await api.put(
      `/api/activity/update-activity/${id}`,
      formData
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const deleteActivity = async (id: string) => {
  try {
    const { data } = await api.delete(`/api/activity/delete-activity/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const deleteActivities = async (ids: string[]) => {
  try {
    const { data } = await api.post('/api/activity/bulk-delete-activities', {
      ids,
    });
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const addGoal = async (formData: GoalsFormData) => {
  try {
    const { data } = await api.post('/api/activity/add-goal', formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const fetchGoals = async (params: URLSearchParams) => {
  try {
    const { data } = await api.get(`/api/activity/fetch-goals?${params}`);
    if (data.success) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGoal = async (id: string) => {
  try {
    const { data } = await api.get(`/api/activity/fetch-goal/${id}`);
    if (data.success) {
      return data.goal;
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const updateGoal = async (id: string, formData: GoalsFormData) => {
  try {
    const { data } = await api.put(`/api/activity/update-goal/${id}`, formData);
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const deleteGoal = async (id: string) => {
  try {
    const { data } = await api.delete(`/api/activity/delete-goal/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const fetchDashBoardData = async () => {
  try {
    const { data } = await api.get('/api/activity/dashboard-data');
    if (data.success) {
      return data.dashboardData;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
