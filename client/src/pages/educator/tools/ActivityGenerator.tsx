import { createActivityIdea } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import { Captions, FileText, MessageSquare } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type ActivityIdeaData = {
  learningObjective: string;
  subject: string;
  topicOrTheme: string;
  classLevel: string;
  numberOfIdeas?: number;
};

const ActivityGenerator = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activityIdea, setActivityIdea] = useState('');
  const form = useForm<ActivityIdeaData>({
    defaultValues: {
      learningObjective: '',
      subject: '',
      topicOrTheme: '',
      classLevel: '',
      numberOfIdeas: 4,
    },
  });

  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createActivityIdea,
    onSuccess: (data) => {
      setActivityIdea(data.activityIdea);
      reset();

      // Scroll to the editor after state is set
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate activities idea');
    },
  });

  const onSubmit = (data: ActivityIdeaData) => {
    mutation.mutate(data);
  };

  return (
    <ToolForm
      toolTitle="ClassSpark ⚡️"
      toolIcon="fa-solid fa-lightbulb"
      toolIconColor="text-yellow-400"
      toolDescription="This tool helps educators quickly generate creative, subject-specific activity ideas for any topic or learning objective. Just provide the subject, class level, and topic, and AI will suggest engaging and effective classroom activities tailored to your needs."
      formTitle="Generate Activity Ideas"
      form={form}
      mutation={mutation}
      onSubmit={onSubmit}
      result={activityIdea}
      resultComponent={
        activityIdea && (
          <div ref={editorRef} className="bg-light-background-color">
            <Editor
              key={activityIdea}
              initialContent={activityIdea}
              fileName="activity-idea.pdf"
            />
          </div>
        )
      }
    >
      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Topic/Theme"
          icon={Captions}
          type="text"
          placeholder="e.g Algebra"
          required
          error={errors.topicOrTheme?.message}
          {...register('topicOrTheme', {
            required: 'Topic/Theme is required',
          })}
        />

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

        <Input
          label="No of Activities"
          icon={FileText}
          type="number"
          error={errors.numberOfIdeas?.message}
          {...register('numberOfIdeas')}
        />
      </div>
    </ToolForm>
  );
};

export default ActivityGenerator;
