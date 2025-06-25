import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../contexts/useAppStore';

const RegisterBanner = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const isProfileComplete = user?.isSubmitted;

  if (!user || isProfileComplete) return null;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center space-x-2 rounded-lg font-medium text-sm  text-center bg-light-background-color ">
      <p className="text-black">Your profile is incomplete! </p>
      <div
        className="flex gap-2 group cursor-pointer"
        onClick={() => navigate('/complete-profile')}
      >
        <span className="underline text-red-700">Complete Registration</span>
        <ArrowRight className="size-5" />
      </div>
    </div>
  );
};

export default RegisterBanner;
