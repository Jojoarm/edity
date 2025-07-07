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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ShowSuccess from './ShowSuccess';
import Input from './Input';
import { useMutation } from '@tanstack/react-query';
import { addActivity } from '@/api/user-api';

export type NewActivityData = {
  title: string;
  type: string;
  provider: string;
  hours: number;
  date: string;
  status: string;
  description?: string;
  certificate?: FileList;
};

const NewActivity = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewActivityData>({
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

  const statusOptions = [
    {
      value: 'completed',
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
    },
    {
      value: 'in-progress',
      label: 'In Progress',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      value: 'registered',
      label: 'Registered',
      color: 'bg-blue-100 text-blue-800',
    },
    { value: 'planned', label: 'Planned', color: 'bg-gray-100 text-gray-800' },
  ];

  const mutation = useMutation({
    mutationFn: addActivity,
    onSuccess: async () => {
      setShowSuccess(true);
      reset();
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'certificate' && value instanceof FileList) {
        formData.append('certificate', value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    mutation.mutate(formData);
  });

  if (showSuccess)
    return (
      <ShowSuccess
        successMessage="Activity Added Successfully!"
        actionMessage="Your professional development activity has been logged."
        action="Add Another Activity"
        setShowSuccess={setShowSuccess}
      />
    );

  return (
    <div className="section min-h-screen bg-gray-50">
      <header className="max-w-4xl mx-auto bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">
                Add New Activity
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => reset()}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Reset Form
              </button>
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
              Log your professional development activity
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  {uploadedCertificate
                    ? uploadedCertificate[0]?.name
                    : 'Upload certificate or documentation'}
                </p>
                <input
                  type="file"
                  {...register('certificate', {
                    validate: (files) => {
                      if (!files || files.length === 0) return true; // Optional upload
                      const file = files[0];
                      const validTypes = [
                        'application/pdf',
                        'image/jpeg',
                        'image/png',
                      ];

                      if (!validTypes.includes(file.type)) {
                        return 'Please upload a PDF, JPG, or PNG file';
                      }

                      const fileSizeInMB = file.size / (1024 * 1024);
                      if (fileSizeInMB > 5) {
                        return 'File size must be less than 5MB';
                      }

                      return true;
                    },
                  })}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="certificate-upload"
                />
                <label
                  htmlFor="certificate-upload"
                  className="cursor-pointer bg-blue-50 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  Choose File
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  PDF, JPG, PNG up to 5MB
                </p>
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
                onClick={() => reset()}
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
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Activity
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

export default NewActivity;
