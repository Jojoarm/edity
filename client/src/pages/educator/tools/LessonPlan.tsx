import { createLessonPlan } from '@/api/educator-api';
import Input from '@/components/common/Input';
import { useMutation } from '@tanstack/react-query';
import { Captions, Clock1, MessageSquare } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';

export type LessonPlanData = {
  learningObjective: string;
  subject: string;
  topic: string;
  classLevel: string;
  duration: string;
};

const LessonPlan = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [lessonPlan, setLessonPlan] = useState<string>('');

  const form = useForm<LessonPlanData>({
    defaultValues: {
      learningObjective: '',
      subject: '',
      topic: '',
      classLevel: '',
      duration: '',
    },
  });

  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createLessonPlan,
    onSuccess: (data) => {
      setLessonPlan(data.lessonPlan);
      reset();
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create lesson plan');
    },
  });

  const onSubmit = (data: LessonPlanData) => {
    mutation.mutate(data);
  };

  return (
    <ToolForm
      toolTitle="Lesson Plan Generator"
      toolIcon="fa-solid fa-person-chalkboard"
      toolIconColor="text-orange-300"
      toolDescription="This tool can be used to create lesson plans. Simply provide a learning objective, subject, topic, class level and lesson duration, and the AI will draft the lesson plan including assessment suggestions."
      formTitle="Generate Lesson Plan"
      form={form}
      mutation={mutation}
      onSubmit={onSubmit}
      result={lessonPlan}
      resultComponent={
        lessonPlan && (
          <div ref={editorRef} className="bg-light-background-color">
            <Editor
              key={lessonPlan}
              initialContent={lessonPlan}
              fileName="lesson-plan.pdf"
            />
          </div>
        )
      }
    >
      <div className="w-full flex flex-col md:flex-row space-x-5">
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
    </ToolForm>
  );
};

export default LessonPlan;
