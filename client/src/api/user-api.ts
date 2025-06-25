import toast from 'react-hot-toast';
import api from '../lib/axios';
import type { RegisterFormData } from '../pages/auth/SignUp';
import type { SignInFormData } from '../pages/auth/SignIn';
import type { UserType } from '../types';
import axios from 'axios';
// import type { RegisterData } from '../pages/auth/Register';

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
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    toast.error(message);
    throw new Error(message);
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
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    toast.error(message);
    throw new Error(message);
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
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    toast.error(message);
    throw new Error(message);
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
  setIsLoggedIn: (loggedIn: boolean) => void,
  setAuthLoading: (loading: boolean) => void
) => {
  try {
    setAuthLoading(true);

    const response = await api.get('/api/users/validate-token');
    if (response.data) {
      setIsLoggedIn(true);
    }
  } catch (error) {
    // Only log non-401 errors
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      console.error('Token validation error:', error);
    }
    setIsLoggedIn(false);
  } finally {
    setAuthLoading(false);
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
