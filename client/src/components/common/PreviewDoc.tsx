type Props = {
  url: string;
  onClose: () => void;
};

const PreviewDoc = ({ url, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          title="Close"
        >
          ✕
        </button>

        <img
          src={url}
          alt="Preview"
          className="max-w-full max-h-[80vh] mx-auto rounded"
        />
      </div>
    </div>
  );
};

export default PreviewDoc;
