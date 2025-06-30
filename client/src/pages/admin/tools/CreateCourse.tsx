import { createCourse } from '@/api/admin-api';
import Button from '@/components/common/Button';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Title from '@/components/common/Title';
import { useAcademicTerms } from '@/hooks/useAcademicTerms';
import { useAcademicYears } from '@/hooks/useAcademicYears';
import { useClassLevels } from '@/hooks/useClassLevels';
import { useSubjects } from '@/hooks/useSubjects';
import { useMutation } from '@tanstack/react-query';
import { Captions, ListPlus, Loader, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type CourseData = {
  title: string;
  description: string;
  subject: string;
  classLevel: string;
  academicYear: string;
  academicTerm: string;
};

const CreateCourse = () => {
  const { isAcademicYearsPending, academicYears } = useAcademicYears();
  const { isAcademicTermsPending, academicTerms } = useAcademicTerms();
  const { isClassLevelPending, classLevels } = useClassLevels();
  const { isSubjectsPending, subjects } = useSubjects();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseData>({
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      academicTerm: '',
      academicYear: '',
      classLevel: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => reset(),
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // Handle loading and error states
  if (
    isAcademicYearsPending ||
    isAcademicTermsPending ||
    isClassLevelPending ||
    isSubjectsPending
  )
    return <Loader />;

  const academicYearOptions = academicYears.map((year) => ({
    value: year._id,
    label: year.name,
  }));

  const academicTermOptions = academicTerms.map((term) => ({
    value: term._id,
    label: term.name,
  }));
  const classLevelsOptions = classLevels.map((classLevel) => ({
    value: classLevel._id,
    label: classLevel.name,
  }));
  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: subject.name,
  }));

  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Create Course"
        subtitle="Add courses for each classes with descriptions tailored to Nigeria’s curriculum (aligned with the UBE & NERDC standards)"
        align="left"
      />

      <form onSubmit={onSubmit} className="form">
        <FormTitle title="New Course" />

        <Input
          label="Title"
          icon={Captions}
          type="text"
          placeholder="e.g Mathematics JSS1"
          required
          error={errors.title?.message}
          {...register('title', {
            required: 'Course title is required',
            validate: (value) =>
              value.length > 2 || 'Title must contain 2 or more character',
          })}
        />

        <Input
          label="Description"
          icon={MessageSquare}
          isTextarea
          placeholder="Enter course description"
          required
          error={errors.description?.message}
          {...register('description', {
            required: 'Course description is required',
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
              return /^[0-9a-fA-F]{24}$/.test(value) || 'Invalid Academic Year';
            },
          })}
        />

        <Input
          label="Academic Term"
          icon={ListPlus}
          isSelect
          options={academicTermOptions}
          required
          error={errors.academicTerm?.message}
          {...register('academicTerm', {
            required: 'Academic term is required',
            validate: (value) => {
              if (!value) return 'Please select an academic term';
              return /^[0-9a-fA-F]{24}$/.test(value) || 'Invalid Academic Term';
            },
          })}
        />

        <Input
          label="Class Level"
          icon={ListPlus}
          isSelect
          options={classLevelsOptions}
          required
          error={errors.classLevel?.message}
          {...register('classLevel', {
            required: 'Class level is required',
            validate: (value) => {
              if (!value) return 'Please select a class level';
              return /^[0-9a-fA-F]{24}$/.test(value) || 'Invalid Class Level';
            },
          })}
        />

        <Input
          label="Subject"
          icon={ListPlus}
          isSelect
          options={subjectOptions}
          required
          error={errors.subject?.message}
          {...register('subject', {
            required: 'Subject is required',
            validate: (value) => {
              if (!value)
                return 'Please select a subject that this course is related to';
              return /^[0-9a-fA-F]{24}$/.test(value) || 'Invalid Subject';
            },
          })}
        />

        <Button isPending={mutation.isPending} />
      </form>
    </div>
  );
};

export default CreateCourse;
