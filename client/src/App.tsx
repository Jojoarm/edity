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

const App = () => {
  const { setUser, isLoggedIn, setIsLoggedIn, setAuthLoading } = useAppStore();

  useEffect(() => {
    const loginStatus = async () => {
      await validateToken(setIsLoggedIn, setAuthLoading);
    };
    loginStatus();
  }, [setIsLoggedIn, setAuthLoading]);

  useEffect(() => {
    if (isLoggedIn) {
      const loadUser = async () => {
        await fetchUser(setUser, setAuthLoading);
      };
      loadUser();
    }
  }, [isLoggedIn, setUser, setAuthLoading]);

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
