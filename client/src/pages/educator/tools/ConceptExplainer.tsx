import { createConceptExplanation } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import { CircleDot, CircleGauge, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type ConceptExplainerData = {
  subject: string;
  classLevel: string;
  topic: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredStyle?:
    | 'analogies'
    | 'examples'
    | 'step-by-step'
    | 'visual'
    | 'storytelling'
    | 'mixed';
};
const ConceptExplainer = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [explanation, setExplanation] = useState<string>('');

  const form = useForm<ConceptExplainerData>({
    defaultValues: {
      subject: '',
      classLevel: '',
      topic: '',
      difficulty: 'Intermediate',
      preferredStyle: 'mixed',
    },
  });

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createConceptExplanation,
    onSuccess: (data) => {
      setExplanation(data.explanation);
      reset();
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate explanation');
    },
  });

  const onSubmit = (data: ConceptExplainerData) => {
    mutation.mutate(data);
  };

  const topic = watch('topic');

  const difficultyLevelOptions = [
    { value: '', label: 'Select Difficulty Level' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advance', label: 'Advance' },
  ];

  const preferredStyleOptions = [
    { value: '', label: 'Select Preferred Style' },
    { value: 'analogies', label: 'analogies' },
    { value: 'examples', label: 'examples' },
    { value: 'visual', label: 'visual' },
    { value: 'storytelling', label: 'storytelling' },
    { value: 'step-by-step', label: 'step-by-step' },
    { value: 'mixed', label: 'mixed' },
  ];

  return (
    <ToolForm
      toolTitle="ClarityCore"
      toolIcon="fa-solid fa-brain"
      toolIconColor="text-rose-300"
      toolDescription="ClarityCore helps educators break down complex concepts into age-appropriate, easy-to-understand explanations. Just enter the topic, subject, and level of difficulty and let AI craft a clear, editable breakdown ready for the classroom."
      formTitle="Generate Concept Explanation"
      form={form}
      mutation={mutation}
      onSubmit={onSubmit}
      result={explanation}
      resultComponent={
        explanation && (
          <div ref={editorRef}>
            <Editor
              key={explanation}
              initialContent={explanation}
              fileName={`concept-${topic}.pdf`}
            />
          </div>
        )
      }
    >
      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Topic/Concept *"
          icon={Sparkles}
          type="text"
          placeholder="e.g. Photosynthesis"
          required
          error={errors.topic?.message}
          {...register('topic', {
            required: 'Topic is required',
          })}
        />
        <Input
          label="Difficulty Level"
          icon={CircleGauge}
          isSelect
          options={difficultyLevelOptions}
          required
          error={errors.difficulty?.message as string}
          {...register('difficulty')}
        />

        <Input
          label="Preferred Style"
          icon={CircleDot}
          isSelect
          options={preferredStyleOptions}
          required
          error={errors.preferredStyle?.message as string}
          {...register('preferredStyle')}
        />
      </div>
    </ToolForm>
  );
};

export default ConceptExplainer;
