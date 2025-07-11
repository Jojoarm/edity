import { Award } from 'lucide-react';

type Props = {
  successMessage: string;
  actionMessage: string;
  action: string;
  setShowSuccess: (value: boolean) => void;
};

const ShowSuccess = ({
  successMessage,
  actionMessage,
  action,
  setShowSuccess,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {successMessage}
          </h2>
          <p className="text-gray-600 mb-6">{actionMessage}</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors cursor-pointer"
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowSuccess;
