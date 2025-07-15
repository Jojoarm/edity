import { createCurriculumMap } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import { FileDigit } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type CurriculumMapData = {
  term: string;
  subject: string;
  topicCount: number;
  classLevel: string;
};
const CurriculumMappingTool = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [curriculumMap, setCurriculumMap] = useState<string>('');
  const form = useForm<CurriculumMapData>({
    defaultValues: {
      subject: '',
      topicCount: 0,
      classLevel: '',
      term: '',
    },
  });
  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createCurriculumMap,
    onSuccess: (data) => {
      setCurriculumMap(data.curriculumMap);
      reset();
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to curriculum map');
    },
  });

  const onSubmit = (data: CurriculumMapData) => {
    mutation.mutate(data);
  };

  return (
    <ToolForm
      toolTitle="Curriculum Mapping Tool"
      toolIcon="fa-solid fa-map"
      toolIconColor="text-primary"
      toolDescription="This tool empowers educators to design and map curricula term-by-term, subject-by-subject, and class-by-class with precision and clarity. It provides a dynamic interface for planning what to teach, when to teach it, and how each learning objective aligns across the academic journey, driving smarter, more connected instruction."
      formTitle="Generate Curriculum"
      form={form}
      includesAcademicTerm
      mutation={mutation}
      onSubmit={onSubmit}
      result={curriculumMap}
      resultComponent={
        curriculumMap && (
          <div ref={editorRef} className="bg-light-background-color">
            <Editor
              key={curriculumMap}
              initialContent={curriculumMap}
              fileName="curriculum-map.pdf"
            />
          </div>
        )
      }
    >
      <Input
        label="Topic Count"
        icon={FileDigit}
        type="number"
        min={0}
        placeholder="Enter number of topics"
        required
        error={errors.topicCount?.message}
        {...register('topicCount', {
          required: 'Topic count is required',
        })}
      />
    </ToolForm>
  );
};

export default CurriculumMappingTool;
