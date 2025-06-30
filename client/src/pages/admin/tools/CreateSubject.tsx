import { createSubject } from '@/api/admin-api';
import Button from '@/components/common/Button';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Title from '@/components/common/Title';
import { useMutation } from '@tanstack/react-query';
import { Captions, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type SubjectData = {
  name: string;
  description: string;
};

const CreateSubject = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectData>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createSubject,
    onSuccess: () => reset(),
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Create Subject"
        subtitle="Add subjects with descriptions tailored to Nigeria’s curriculum (aligned with the UBE & NERDC standards)"
        align="left"
      />

      <form onSubmit={onSubmit} className="form">
        <FormTitle title="New Subject" />

        <Input
          label="Title"
          icon={Captions}
          type="text"
          placeholder="e.g Mathematics"
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'Subject name is required',
            validate: (value) =>
              value.length > 2 || 'Name must contain 2 or more character',
          })}
        />

        <Input
          label="Description"
          icon={MessageSquare}
          isTextarea
          placeholder="Enter subject description"
          required
          error={errors.description?.message}
          {...register('description', {
            required: 'Subject description is required',
          })}
        />

        <Button isPending={mutation.isPending} />
      </form>
    </div>
  );
};

export default CreateSubject;
