import { createAcademicTerm, fetchAcademicYears } from '@/api/admin-api';
import Button from '@/components/common/Button';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Loader from '@/components/common/Loader';
import Title from '@/components/common/Title';
import type { AcademicYear } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Calendar1, Captions, ListPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type AcademicTermData = {
  name: string;
  startDate: string;
  endDate: string;
  academicYear: string;
};

const CreateAcademicTerm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AcademicTermData>({
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      academicYear: '',
    },
  });

  const startDate = watch('startDate');

  const mutation = useMutation({
    mutationFn: createAcademicTerm,
    onSuccess: () => reset(),
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const { data: academicYears, isPending } = useQuery({
    queryKey: ['fetchAcademicYears'],
    queryFn: fetchAcademicYears,
  });

  if (isPending) return <Loader />;

  const academicYearOptions =
    academicYears?.map((year: AcademicYear) => ({
      value: year._id,
      label: year.name,
    })) || [];

  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Create Academic Term"
        subtitle="Add academic terms with start and end dates for a particula academic year"
        align="left"
      />

      <form
        onSubmit={onSubmit}
        className="p-5 mb-10 w-full max-w-xl flex flex-col items-center justify-center shadow-xl bg-white border border-gray-300/80 rounded-2xl "
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
            validate: (value) =>
              ['First Term', 'Second Term', 'Third Term'].includes(value) ||
              'Name must be First Term, Second Term, or Third Term',
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

        {/* academic Year */}
        <Input
          label="Academic Year?"
          icon={ListPlus}
          isSelect
          options={academicYearOptions}
          required
          error={errors.academicYear?.message}
          {...register('academicYear', {
            required: 'Academic year is required',
            validate: (value) =>
              /^[0-9a-fA-F]{24}$/.test(value) || 'Invalid Academic Year ID',
          })}
        />
        <Button isPending={mutation.isPending} />
      </form>
    </div>
  );
};

export default CreateAcademicTerm;
