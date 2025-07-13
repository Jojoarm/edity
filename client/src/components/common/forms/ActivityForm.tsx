import {
  Award,
  BookOpen,
  Calendar1,
  Captions,
  Clock1,
  ListPlus,
  MessageSquare,
  Monitor,
  Save,
  Upload,
  Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ShowSuccess from '../../common/ShowSuccess';
import Input from '../../common/Input';
import Loader from '../../common/Loader';
import { addActivity, updateActivity, fetchActivity } from '@/api/user-api';
import { formatDateForInput } from '@/lib/utils';
import { statusOptions } from '@/assets/assets';

export type ActivityFormData = {
  title: string;
  type: string;
  provider: string;
  hours: number;
  date: string;
  status: string;
  description?: string;
  certificate?: FileList;
};

interface ActivityFormProps {
  mode?: 'create' | 'edit';
  activityId?: string;
  onSuccess?: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  mode = 'create',
  activityId,
  onSuccess,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  // Determine mode and ID from props or URL params
  const isEditMode = mode === 'edit' || !!params.id;
  const currentActivityId = activityId || params.id;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ActivityFormData>({
    defaultValues: {
      title: '',
      type: '',
      provider: '',
      hours: 0,
      date: '',
      status: 'completed',
      description: '',
      certificate: undefined,
    },
  });

  // Fetch activity data for edit mode
  const { data: activityData, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['activity', currentActivityId],
    queryFn: () => fetchActivity(currentActivityId!),
    enabled: isEditMode && !!currentActivityId,
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && activityData) {
      reset({
        title: activityData.title,
        type: activityData.type,
        provider: activityData.provider,
        hours: activityData.hours,
        date: formatDateForInput(activityData.date),
        status: activityData.status,
        description: activityData.description,
        certificate: undefined,
      });
    }
  }, [activityData, isEditMode, reset]);

  const selectedType = watch('type');
  const uploadedCertificate = watch('certificate');

  const activityTypes = [
    { value: 'workshop', label: 'Workshop', icon: Users },
    { value: 'course', label: 'Online Course', icon: Monitor },
    { value: 'conference', label: 'Conference', icon: BookOpen },
    { value: 'certification', label: 'Certification', icon: Award },
    { value: 'webinar', label: 'Webinar', icon: Monitor },
    { value: 'training', label: 'Training Session', icon: Users },
    { value: 'reading', label: 'Professional Reading', icon: BookOpen },
    { value: 'mentoring', label: 'Mentoring', icon: Users },
  ];

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      isEditMode
        ? updateActivity(currentActivityId!, formData)
        : addActivity(formData),
    onSuccess: async () => {
      setShowSuccess(true);
      if (!isEditMode) {
        reset();
      }
      onSuccess?.();
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'certificate' && value instanceof FileList) {
        if (value.length > 0) {
          formData.append('certificate', value[0]);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    mutation.mutate(formData);
  });

  const handleSuccess = async () => {
    setShowSuccess(false);
    if (isEditMode) {
      navigate('/educator/professional-development-tracker/activities');
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    }
  };

  if (isLoadingActivity) return <Loader />;

  if (showSuccess)
    return (
      <ShowSuccess
        successMessage={
          isEditMode
            ? 'Activity Updated Successfully!'
            : 'Activity Added Successfully!'
        }
        actionMessage={
          isEditMode
            ? 'Your professional development activity has been updated.'
            : 'Your professional development activity has been logged.'
        }
        action={isEditMode ? 'Back to Activities' : 'Add Another Activity'}
        setShowSuccess={handleSuccess}
      />
    );

  return (
    <div className="section min-h-screen bg-gray-50">
      <header className="max-w-4xl mx-auto bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {isEditMode ? (
                <i className="fa-solid fa-pen-to-square text-primary mr-3 text-2xl"></i>
              ) : (
                <i className="fa-solid fa-user-graduate text-primary mr-3 text-2xl"></i>
              )}
              <h1 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Edit Activity' : 'Add New Activity'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => reset()}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Reset Form
              </button>
              {isEditMode && (
                <button
                  onClick={() => navigate('/activities')}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Activity Details
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isEditMode
                ? 'Update your professional development activity'
                : 'Log your professional development activity'}
            </p>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            {/* Activity Title */}
            <Input
              label="Activity Title *"
              icon={Captions}
              type="text"
              placeholder="e.g., Modern JavaScript Frameworks Workshop"
              required
              error={errors.title?.message}
              {...register('title', {
                required: 'Title is required',
              })}
            />

            {/* Activity Type */}
            <div>
              <label className="text-sm font-semibold text-gray-500/80 mb-2 block">
                Activity Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activityTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        selectedType === type.value
                          ? 'bg-blue-50 border-primary-500 text-primary-100'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setValue('type', type.value)}
                    >
                      <Icon className="size-4 mx-auto mb-1" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Provider and Hours Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Provider/Organization *"
                icon={Captions}
                type="text"
                placeholder="e.g., Tech Education Hub"
                required
                error={errors.provider?.message}
                {...register('provider', {
                  required: 'Provider is required',
                })}
              />

              <Input
                label="Hours *"
                icon={Clock1}
                type="number"
                placeholder="8"
                required
                min={0}
                max={100}
                error={errors.hours?.message}
                {...register('hours', {
                  required: 'Hours is required',
                  validate: (value) => {
                    const num = Number(value);
                    if (isNaN(num)) return 'Hours must be a number';
                    if (num < 0 || num > 100)
                      return 'Hours must be between 0 and 100';
                    return true;
                  },
                })}
              />
            </div>

            {/* Date and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Date *"
                icon={Calendar1}
                type="date"
                placeholder="dd/mm/yyyy"
                required
                error={errors.date?.message}
                {...register('date', {
                  required: 'Date is required',
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const now = new Date();
                    const oneYearFromNow = new Date();
                    oneYearFromNow.setFullYear(now.getFullYear() + 1);

                    if (selectedDate > oneYearFromNow) {
                      return 'Date cannot be more than 1 year in the future';
                    }
                    return true;
                  },
                })}
              />

              <Input
                label="Status"
                icon={ListPlus}
                isSelect
                options={statusOptions}
                required
                error={errors.status?.message as string}
                {...register('status', {
                  required: 'Status is required',
                })}
              />
            </div>

            {/* Description */}
            <Input
              label="Description"
              icon={MessageSquare}
              isTextarea
              placeholder="Brief description of what you learned or key takeaways..."
              rows={4}
              error={errors.description?.message}
              {...register('description', {
                validate: (value) => {
                  if (!value) return true;
                  if (value.length > 500)
                    return 'Description must be less than 500 characters';
                  return true;
                },
              })}
            />

            {/* Certificate Upload */}
            <div>
              <label className="text-sm font-semibold text-gray-500/80 mb-2 block">
                Certificate/Documentation
              </label>

              {/* Show existing certificate if editing */}
              {isEditMode && activityData?.certificate && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-600">
                    Current certificate:
                    <a
                      href={activityData.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      View Certificate
                    </a>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a new file to replace the current certificate
                  </p>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  {uploadedCertificate && uploadedCertificate.length > 0
                    ? uploadedCertificate[0]?.name
                    : isEditMode
                    ? 'Upload new certificate or documentation'
                    : 'Upload certificate or documentation'}
                </p>
                <input
                  type="file"
                  {...register('certificate', {
                    validate: (files) => {
                      if (!files || files.length === 0) return true;
                      const file = files[0];
                      const validTypes = [
                        'application/pdf',
                        'image/jpeg',
                        'image/png',
                      ];

                      if (!validTypes.includes(file.type)) {
                        return 'Please upload a JPG, or PNG file';
                      }

                      const fileSizeInMB = file.size / (1024 * 1024);
                      if (fileSizeInMB > 5) {
                        return 'File size must be less than 5MB';
                      }

                      return true;
                    },
                  })}
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  id="certificate-upload"
                />
                <label
                  htmlFor="certificate-upload"
                  className="cursor-pointer bg-blue-50 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  Choose File
                </label>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 5MB</p>
              </div>
              {errors.certificate && (
                <span className="text-red-500 text-xs">
                  {errors.certificate?.message}
                </span>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => (isEditMode ? navigate('/activities') : reset())}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    {isEditMode ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditMode ? 'Update Activity' : 'Save Activity'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ActivityForm;
