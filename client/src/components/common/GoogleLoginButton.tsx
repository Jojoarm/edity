import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppStore } from '../../contexts/useAppStore';
import { fetchUser } from '../../api/user-api';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const { setUser, setAuthLoading } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleCallbackResponse = async (
    response: google.accounts.id.CredentialResponse
  ) => {
    const { credential } = response;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/users/google-auth`,
        {
          tokenId: credential,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        await fetchUser(setUser, setAuthLoading);

        // Differentiate between login and signup
        if (res.data.newUser === true) {
          toast.success('Welcome! Account created successfully');
          // Redirect to onboarding or profile completion
          navigate('/complete-profile');
        } else {
          toast.success('Welcome back!');
          // Redirect to dashboard or intended page
          navigate(location.state?.from?.pathname || '/dashboard');
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error('Google login failed', err);
      alert('Authentication failed');
    }
  };

  useEffect(() => {
    if (!window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID!,
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-btn')!,
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);

  return <div id="google-signin-btn" className="w-full mt-4" />;
};

export default GoogleLoginButton;
