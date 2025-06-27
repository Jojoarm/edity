import { BadgeAlert } from 'lucide-react';

interface ConfirmationBoxProps {
  message?: string;
  subMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationBox = ({
  message = 'Are you sure?',
  subMessage = 'Do you really want to continue with this action?',
  onConfirm,
  onCancel,
}: ConfirmationBoxProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ease-out animate-fadeIn">
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-300 transform transition-transform duration-300 ease-out animate-scaleIn">
        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <BadgeAlert className="size-7 text-white" />
        </div>
        <h2 className="text-gray-900 font-semibold mt-4 text-xl">{message}</h2>
        <p className="text-sm text-gray-600 mt-2 text-center">{subMessage}</p>
        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            type="button"
            onClick={onCancel}
            className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
