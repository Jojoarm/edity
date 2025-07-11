import { fetchActivity } from '@/api/user-api';
import { useQuery } from '@tanstack/react-query';
import { formatDate, capitalize } from '@/lib/utils';
import { FileText } from 'lucide-react';
import Loader from '@/components/common/Loader';

type Props = {
  id: string;
  onClose: () => void;
};

const PreviewActivity = ({ id, onClose }: Props) => {
  const { data: activity, isPending } = useQuery({
    queryKey: ['fetchActivity', id],
    queryFn: () => fetchActivity(id),
  });

  if (isPending) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!activity) return null;

  const {
    title,
    type,
    provider,
    hours,
    date,
    status,
    description,
    certificate,
    user,
  } = activity;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
          title="Close"
        >
          ✕
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {capitalize(type)} &mdash; {provider}
            </p>
          </div>

          {/* Activity Details */}
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-600">Status</p>
              <p className="capitalize">{status}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Date</p>
              <p>{formatDate(date)}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Hours</p>
              <p>{hours} hrs</p>
            </div>
            {description && (
              <div className="sm:col-span-2">
                <p className="font-semibold text-gray-600">Description</p>
                <p>{description}</p>
              </div>
            )}
          </div>

          {/* Educator Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Educator Info
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-600">Name</p>
                <p>{user?.name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Email</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Phone</p>
                <p>{user?.tel}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Gender</p>
                <p className="capitalize">{user?.gender}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Teacher ID</p>
                <p>{user?.educatorData?.teacherId}</p>
              </div>
            </div>
          </div>

          {/* Certificate Preview */}
          {certificate && (
            <div className="flex items-center gap-2 text-sm text-primary font-medium pt-4">
              <FileText className="w-5 h-5" />
              <a
                href={certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View Certificate
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewActivity;
