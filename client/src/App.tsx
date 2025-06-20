import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/Home';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './components/common/ForgotPassword';
import TokenVerification from './components/common/TokenVerification';
import ResetPassword from './components/common/ResetPassword';

const App = () => {
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
