import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/Home';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import TokenVerification from './pages/auth/TokenVerification';
import { useAppStore } from './contexts/useAppStore';
import { useEffect } from 'react';
import { fetchUser, validateToken } from './api/user-api';
import ResetPassword from './pages/auth/ResetPassword';
import Register from './pages/auth/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Approval from './pages/admin/Approval';
import AdminTools from './pages/admin/AdminTools';
import AllEducators from './pages/admin/AllEducators';
import AllStudents from './pages/admin/AllStudents';

const App = () => {
  const { setUser, setIsLoggedIn, setAuthLoading } = useAppStore();

  useEffect(() => {
    const initializeAuth = async () => {
      setAuthLoading(true);

      try {
        // Validate token and get the result
        const isValidToken = await validateToken(setIsLoggedIn);

        if (isValidToken) {
          // Token is valid, fetch user data
          await fetchUser(setUser, setAuthLoading);
        } else {
          // Token is invalid, stop loading
          setAuthLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, [setIsLoggedIn, setUser, setAuthLoading]);

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-token" element={<TokenVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* complete profile */}
        <Route path="/complete-profile" element={<Register />} />

        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/approval" element={<Approval />} />
          <Route path="/admin/all-educators" element={<AllEducators />} />
          <Route path="/admin/all-students" element={<AllStudents />} />
          <Route path="/admin/tools" element={<AdminTools />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
