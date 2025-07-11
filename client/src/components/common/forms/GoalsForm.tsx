import {
  Calendar1,
  Captions,
  ListPlus,
  MessageSquare,
  Save,
  Timer,
  Clock,
  Milestone,
  CircleX,
} from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Input from '../../common/Input';
import Loader from '../../common/Loader';
import { fetchGoal, updateGoal, addGoal } from '@/api/user-api';
import { formatDateForInput } from '@/lib/utils';
import { statusOptions } from '@/assets/assets';

export type GoalsFormData = {
  title: string;
  description: string;
  type: string;
  current: number;
  target: number;
  deadline: string;
  status: string;
  priority: string;
  category: string;
};

interface GoalsFormProps {
  mode?: 'create' | 'edit';
  goalId?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const GoalsForm: React.FC<GoalsFormProps> = ({
  mode = 'create',
  onClose,
  goalId,
  onSuccess,
}) => {
  const queryClient = useQueryClient();

  // Determine mode and ID from props or URL params
  const isEditMode = mode === 'edit';
  const currentGoalId = goalId;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<GoalsFormData>({
    defaultValues: {
      title: '',
      description: '',
      type: '',
      current: 0,
      target: 0,
      deadline: '',
      status: 'completed',
      priority: '',
      category: '',
    },
  });

  // Fetch activity data for edit mode
  const { data: goalData, isLoading: isLoadingGoal } = useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => fetchGoal(currentGoalId!),
    enabled: isEditMode && !!currentGoalId,
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && goalData) {
      reset({
        title: goalData.title,
        type: goalData.type,
        description: goalData.description,
        current: goalData.current,
        target: goalData.target,
        deadline: formatDateForInput(goalData.deadline),
        status: goalData.status,
        priority: goalData.priority,
        category: goalData.category,
      });
    }
  }, [goalData, isEditMode, reset]);

  const selectedType = watch('type');

  const goalTypes = [
    { value: 'hours', label: 'Hours', icon: Clock },
    { value: 'count', label: 'Count', icon: Timer },
    { value: 'milestone', label: 'Milestone', icon: Milestone },
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const categoryOptions = [
    { value: 'Required', label: 'Required' },
    { value: 'Skill Development', label: 'Skill Development' },
    { value: 'Certification', label: 'Certification' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Other', label: 'Other' },
  ];

  const mutation = useMutation({
    mutationFn: (formData: GoalsFormData) =>
      isEditMode ? updateGoal(currentGoalId!, formData) : addGoal(formData),
    onSuccess: async () => {
      if (!isEditMode) {
        reset();
      }
      await queryClient.invalidateQueries({
        queryKey: ['goals'],
      });
      onClose();
      onSuccess?.();
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl mx-4 overflow-hidden">
        <div className="p-4 w-full max-w-4xl max-h-[750px] overflow-y-auto">
          <header className=" mx-auto bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  {isEditMode ? (
                    <i className="fa-solid fa-pen-to-square text-primary mr-3 text-2xl"></i>
                  ) : (
                    <i className="fa-solid fa-bullseye text-primary mr-3 text-2xl"></i>
                  )}
                  <h1 className="text-base md:text-xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Goal' : 'Add New Goal'}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => reset()}
                    className="text-navy-500 hover:text-navy-50 hover:bg-navy-500 text-xs md:text-sm font-normal md:font-medium border rounded-2xl px-2 py-0.5 border-navy-500 cursor-pointer"
                  >
                    Reset
                  </button>
                  <CircleX
                    onClick={onClose}
                    className="size-6 text-red-600 hover:text-red-900 text-sm font-medium cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Goal Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {isEditMode
                    ? 'Update your professional development goal'
                    : 'Log your professional development goal'}
                </p>
              </div>

              {isLoadingGoal ? (
                <Loader />
              ) : (
                <form onSubmit={onSubmit} className="p-6 space-y-6">
                  {/* Goal Title */}
                  <Input
                    label="Goal Title *"
                    icon={Captions}
                    type="text"
                    placeholder="e.g., 30 PD Hours"
                    required
                    error={errors.title?.message}
                    {...register('title', {
                      required: 'Title is required',
                    })}
                  />

                  {/* Description */}
                  <Input
                    label="Description *"
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

                  {/* Goal Type */}
                  <div>
                    <label className="text-sm font-semibold text-gray-500/80 mb-2 block">
                      Goal Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {goalTypes.map((type) => {
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

                  {/* Target and current Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Current *"
                      icon={Captions}
                      type="number"
                      placeholder="Current Value"
                      required
                      error={errors.current?.message}
                      {...register('current', {
                        required: 'Current is required',
                        min: {
                          value: 0,
                          message: 'Current value cannot be negative',
                        },
                        validate: (value) => {
                          const targetValue = watch('target');
                          if (
                            targetValue &&
                            Number(value) > Number(targetValue)
                          ) {
                            return 'Current value cannot exceed target value';
                          }
                          return true;
                        },
                      })}
                    />

                    <Input
                      label="Target *"
                      icon={Captions}
                      type="number"
                      placeholder="Target Value"
                      required
                      error={errors.target?.message}
                      {...register('target', {
                        required: 'Target is required',
                        min: {
                          value: 1,
                          message: 'Target must be at least 1',
                        },
                        validate: (value) => {
                          const currentValue = watch('current');
                          if (
                            currentValue &&
                            Number(currentValue) > Number(value)
                          ) {
                            return 'Target value must be greater than or equal to current value';
                          }
                          return true;
                        },
                      })}
                    />
                  </div>

                  {/* Status and deadline Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Status *"
                      icon={ListPlus}
                      isSelect
                      options={statusOptions}
                      required
                      error={errors.status?.message as string}
                      {...register('status', {
                        required: 'Status is required',
                      })}
                    />

                    <Input
                      label="Deadline *"
                      icon={Calendar1}
                      type="date"
                      placeholder="dd/mm/yyyy"
                      required
                      error={errors.deadline?.message}
                      {...register('deadline', {
                        required: 'Deadline is required',
                      })}
                    />
                  </div>

                  {/* Priority and Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Priority *"
                      icon={ListPlus}
                      isSelect
                      options={priorityOptions}
                      required
                      error={errors.priority?.message as string}
                      {...register('priority', {
                        required: 'Priority is required',
                      })}
                    />

                    <Input
                      label="Category *"
                      icon={ListPlus}
                      isSelect
                      options={categoryOptions}
                      required
                      error={errors.category?.message as string}
                      {...register('category', {
                        required: 'Category is required',
                      })}
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={onClose}
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
                          {isEditMode ? 'Update Goal' : 'Save Goal'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GoalsForm;
