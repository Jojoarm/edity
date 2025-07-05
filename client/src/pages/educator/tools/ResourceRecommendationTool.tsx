import { createResourceRecommendation } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import { Captions, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type ResourceRecommendationData = {
  learningObjective: string;
  subject: string;
  topic: string;
  term: string;
  classLevel: string;
};
const ResourceRecommendationTool = () => {
  const [recommendedResources, setRecommendedResources] = useState<string>('');
  const form = useForm<ResourceRecommendationData>({
    defaultValues: {
      learningObjective: '',
      subject: '',
      topic: '',
      term: '',
      classLevel: '',
    },
  });

  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createResourceRecommendation,
    onSuccess: (data) => {
      setRecommendedResources(data.recommendedResources);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create lesson plan');
    },
  });

  const onSubmit = (data: ResourceRecommendationData) => {
    mutation.mutate(data);
  };

  return (
    <ToolForm
      toolTitle="Resource Recommendation Engine"
      toolIcon="fa-solid fa-scroll"
      toolIconColor="text-orange-300"
      toolDescription="Instantly get smart, high quality resource recommendations based on your lesson goals. Just tell the tool what you’re teaching and get curated content that fits your class level, topic, and learning outcomes."
      formTitle="Generate Recommended Resources"
      form={form}
      includesAcademicTerm
      mutation={mutation}
      onSubmit={onSubmit}
      result={recommendedResources}
      resultComponent={
        recommendedResources && (
          <Editor
            key={recommendedResources}
            initialContent={recommendedResources}
            fileName="recommended-resources.pdf"
          />
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
      </div>
    </ToolForm>
  );
};

export default ResourceRecommendationTool;
