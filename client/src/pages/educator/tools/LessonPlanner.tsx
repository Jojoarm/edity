import { createLessonPlan } from '@/api/educator-api';
import Button from '@/components/common/Button';
import CircularShape from '@/components/common/CircularShape';
import FormTitle from '@/components/common/FormTitle';
import Input from '@/components/common/Input';
import Loader from '@/components/common/Loader';
import { useClassLevels } from '@/hooks/useClassLevels';
import { useSubjects } from '@/hooks/useSubjects';
import { useMutation } from '@tanstack/react-query';
import { Captions, Clock1, ListPlus, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ToolTitle from '@/components/common/ToolTitle';
import Editor from '@/components/educator/Editor';

export type LessonPlanData = {
  learningObjective: string;
  subject: string;
  topic: string;
  classLevel: string;
  duration: string;
};

const LessonPlanner = () => {
  const { isClassLevelPending, classLevels } = useClassLevels();
  const { isSubjectsPending, subjects } = useSubjects();
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LessonPlanData>({
    defaultValues: {
      learningObjective: '',
      subject: '',
      topic: '',
      classLevel: '',
      duration: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createLessonPlan,
    onSuccess: (data) => {
      setLessonPlan(data.lessonPlan);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create lesson plan');
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const topic = watch('topic');

  // Handle loading and error states
  if (isClassLevelPending || isSubjectsPending) return <Loader />;

  const classLevelsOptions = classLevels.map((classLevel) => ({
    value: classLevel.name,
    label: classLevel.name,
  }));

  const subjectOptions = subjects.map((subject) => ({
    value: subject.name,
    label: subject.name,
  }));

  return (
    <div className="relative section w-full h-full bg-light-background-color overflow-hidden py-10">
      <CircularShape
        xPosition="-left-40"
        yPosition="-top-40"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <CircularShape
        xPosition="-right-50"
        yPosition="bottom-0"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <div className="relative flex flex-col gap-3 w-full">
        <ToolTitle
          title="Lesson Plan Generator"
          icon="fa-solid fa-person-chalkboard"
          iconColor="text-orange-300 "
          description="This tool can be used to create lesson plans. Simply provide a learning objective, subject, topic, class level and lesson duration, and the AI will draft the lesson plan including assessment suggestions."
        />

        <form
          onSubmit={onSubmit}
          className="py-5 px-10 mb-10 w-full flex flex-col items-center justify-center shadow-xl bg-white border border-gray-300/80 rounded-2xl"
        >
          <FormTitle title="Generate Lesson Plan" />

          <div className="w-full flex flex-col md:flex-row space-x-5">
            <Input
              label="Subject"
              icon={ListPlus}
              isSelect
              options={subjectOptions}
              required
              error={errors.subject?.message}
              {...register('subject', {
                required: 'Subject is required',
              })}
            />
            <Input
              label="Topic"
              icon={Captions}
              type="text"
              placeholder="e.g Algebra"
              required
              error={errors.topic?.message}
              {...register('topic', {
                required: 'Topic is required',
              })}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row space-x-5">
            <Input
              label="Class Level"
              icon={ListPlus}
              isSelect
              options={classLevelsOptions}
              required
              error={errors.classLevel?.message}
              {...register('classLevel', {
                required: 'Class level is required',
              })}
            />

            <Input
              label="Duration in Minutes"
              icon={Clock1}
              type="number"
              min={0}
              placeholder="e.g 60 minutes"
              required
              error={errors.duration?.message}
              {...register('duration', {
                required: 'duration is required',
              })}
            />
          </div>

          <Input
            label="Learning Objective"
            icon={MessageSquare}
            isTextarea
            placeholder="Enter a learning objective"
            required
            error={errors.learningObjective?.message}
            {...register('learningObjective', {
              required: 'Learning Objective is required',
            })}
          />

          <Button isPending={mutation.isPending} />
        </form>

        {lessonPlan && (
          <Editor
            key={lessonPlan}
            initialContent={lessonPlan}
            fileName={topic}
          />
        )}
      </div>
    </div>
  );
};

export default LessonPlanner;
