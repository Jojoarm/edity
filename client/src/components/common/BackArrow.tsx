import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BackArrow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || -1;
  return (
    <button
      onClick={() => navigate(from)}
      className="text-primary hover:underline cursor-pointer"
    >
      <ArrowLeft className="size-5 mr-2" />
    </button>
  );
};

export default BackArrow;
