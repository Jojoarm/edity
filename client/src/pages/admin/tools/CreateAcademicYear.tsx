import { createAcademicYear } from '@/api/admin-api';
import Button from '@/components/common/Button';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Title from '@/components/common/Title';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar1, Captions, Projector } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type AcademicYearData = {
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

const CreateAcademicYear = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AcademicYearData>({
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    },
  });

  const startDate = watch('startDate');

  const mutation = useMutation({
    mutationFn: createAcademicYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAcademicYears'] });
      reset();
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const isCurrentOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Create Academic Year"
        subtitle="Add academic years with start and end dates"
        align="left"
      />

      <form
        onSubmit={onSubmit}
        className="p-5 mb-10 w-full max-w-xl flex flex-col items-center justify-center shadow-xl bg-white border border-gray-300/80 rounded-2xl "
      >
        <FormTitle title="New Academic Year" />

        <Input
          label="Title"
          icon={Captions}
          type="text"
          placeholder="e.g 2024/2025"
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'Academic Year name is required',
            validate: (value) =>
              /^\d{4}\/\d{4}$/.test(value) || 'Invalid Academic Year Title',
          })}
        />
        <Input
          label="Start Date"
          icon={Calendar1}
          type="date"
          placeholder="Start Date of Academic Year"
          required
          error={errors.startDate?.message}
          {...register('startDate', {
            required: 'Start date is required',
            validate: (value) =>
              !isNaN(Date.parse(value)) || 'Start date must be a valid date',
          })}
        />
        <Input
          label="End Date"
          icon={Calendar1}
          type="date"
          placeholder="End Date of Academic Year"
          required
          error={errors.endDate?.message}
          {...register('endDate', {
            required: 'End date is required',
            validate: (value) => {
              const start = Date.parse(startDate);
              const end = Date.parse(value);
              if (isNaN(end)) return 'End date must be a valid date';
              if (start >= end) return 'End date must be after start date';
              return true;
            },
          })}
        />

        {/* IsCurrent */}
        <Input
          label="Current Academic Year?"
          icon={Projector}
          isSelect
          options={isCurrentOptions}
          required
          error={errors.isCurrent?.message}
          {...register('isCurrent', {
            required: 'This field is required!',
          })}
        />
        <Button isPending={mutation.isPending} />
      </form>
    </div>
  );
};

export default CreateAcademicYear;
