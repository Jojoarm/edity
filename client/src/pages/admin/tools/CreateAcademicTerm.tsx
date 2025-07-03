import { createAcademicTerm } from '@/api/admin-api';
import Button from '@/components/common/Button';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Loader from '@/components/common/Loader';
import Title from '@/components/common/Title';
import { useMutation } from '@tanstack/react-query';
import { Calendar1, Captions, ListPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAcademicYears } from '@/hooks/useAcademicYears';

export type AcademicTermData = {
  name: string;
  startDate: string;
  endDate: string;
  academicYear: string;
};

const CreateAcademicTerm = () => {
  const { isAcademicYearsPending, academicYears } = useAcademicYears();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<AcademicTermData>({
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      academicYear: '',
    },
  });

  const startDate = watch('startDate') ?? '';
  const endDate = watch('endDate') ?? '';

  // Re-validate end date when start date changes
  useEffect(() => {
    if (startDate && endDate) {
      trigger('endDate');
    }
  }, [startDate, trigger, endDate]);

  const mutation = useMutation({
    mutationFn: createAcademicTerm,
    onSuccess: () => {
      toast.success('Academic term created successfully!');
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create academic term');
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // Handle loading and error states
  if (isAcademicYearsPending) return <Loader />;

  const academicYearOptions = academicYears.map((year) => ({
    value: year._id,
    label: year.name,
  }));

  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Create Academic Term"
        subtitle="Add academic terms with start and end dates for a particular academic year"
        align="left"
      />

      <form
        onSubmit={onSubmit}
        className="p-5 mb-10 w-full max-w-xl flex flex-col items-center justify-center shadow-xl bg-white border border-gray-300/80 rounded-2xl"
      >
        <FormTitle title="New Academic Term" />

        <Input
          label="Title"
          icon={Captions}
          type="text"
          placeholder="e.g First Term"
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'Term name is required',
            validate: (value) => {
              const trimmedValue = value.trim();
              const validTerms = ['First Term', 'Second Term', 'Third Term'];
              return (
                validTerms.some(
                  (term) => term.toLowerCase() === trimmedValue.toLowerCase()
                ) || 'Name must be First Term, Second Term, or Third Term'
              );
            },
          })}
        />

        <Input
          label="Start Date"
          icon={Calendar1}
          type="date"
          placeholder="Start Date of Academic Term"
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
          placeholder="End Date of Academic Term"
          required
          error={errors.endDate?.message}
          {...register('endDate', {
            required: 'End date is required',
            validate: (value) => {
              if (!value) return 'End date is required';

              const start = Date.parse(startDate);
              const end = Date.parse(value);

              if (isNaN(end)) return 'End date must be a valid date';
              if (!startDate) return 'Please select a start date first';
              if (isNaN(start)) return 'Start date must be valid';
              if (start >= end) return 'End date must be after start date';

              return true;
            },
          })}
        />

        <Input
          label="Academic Year"
          icon={ListPlus}
          isSelect
          options={academicYearOptions}
          required
          error={errors.academicYear?.message}
          {...register('academicYear', {
            required: 'Academic year is required',
            validate: (value) => {
              if (!value) return 'Please select an academic year';
              return (
                /^[0-9a-fA-F]{24}$/.test(value) || 'Invalid Academic Year ID'
              );
            },
          })}
        />

        <Button isPending={mutation.isPending} />
      </form>
    </div>
  );
};

export default CreateAcademicTerm;
