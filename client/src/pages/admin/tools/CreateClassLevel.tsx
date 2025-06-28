import { createClassLevel } from '@/api/admin-api';
import Button from '@/components/common/Button';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Title from '@/components/common/Title';
import { useMutation } from '@tanstack/react-query';
import { Captions, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type ClassLevelData = {
  name: string;
  description: string;
};

const CreateClassLevel = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassLevelData>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createClassLevel,
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
        title="Create Class Level"
        subtitle="Add different class levels"
        align="left"
      />

      <form onSubmit={onSubmit} className="form">
        <FormTitle title="New Class Level" />

        <Input
          label="Title"
          icon={Captions}
          type="text"
          placeholder="e.g Primary 1"
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'Class Level name is required',
            validate: (value) =>
              value.length > 2 || 'Name must contain 2 or more character',
          })}
        />

        <Input
          label="Description"
          icon={MessageSquare}
          isTextarea
          placeholder="Enter class level description"
          required
          error={errors.name?.message}
          {...register('description', {
            required: 'Class Level description is required',
          })}
        />

        <Button isPending={mutation.isPending} />
      </form>
    </div>
  );
};

export default CreateClassLevel;
