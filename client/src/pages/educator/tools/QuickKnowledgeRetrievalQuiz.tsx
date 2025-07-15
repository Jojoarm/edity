import { createKnowledgeRetrievalQuiz } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import { Captions, CircleGauge, FileText } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type KnowledgeRetrievalQuizData = {
  subject: string;
  classLevel: string;
  topicOrLessonTitle: string;
  numberOfQuestions?: number;
  difficultyLevel?: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
};
const QuickKnowledgeRetrievalQuiz = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [quiz, setQuiz] = useState('');
  const form = useForm<KnowledgeRetrievalQuizData>({
    defaultValues: {
      subject: '',
      classLevel: '',
      topicOrLessonTitle: '',
      numberOfQuestions: 10,
      difficultyLevel: 'Medium',
    },
  });
  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createKnowledgeRetrievalQuiz,
    onSuccess: (data) => {
      setQuiz(data.quiz);
      reset();
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create quiz');
    },
  });

  const onSubmit = (data: KnowledgeRetrievalQuizData) => {
    mutation.mutate(data);
  };

  const difficultyLevelOptions = [
    { value: '', label: 'Select Difficulty Level' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
    { value: 'Mixed', label: 'Mixed' },
  ];

  return (
    <ToolForm
      toolTitle="Knowledge Retrieval Quiz Generator"
      toolIcon="fa-solid fa-clipboard-question"
      toolIconColor="text-indigo-500"
      toolDescription="This tool enables educators to instantly generate engaging and targeted knowledge retrieval quizzes for any topic, class level, or subject. By entering the topic and lesson context, AI generates multiple choice and short answer questions designed to reinforce retention and check understanding. Perfect for quick assessments or review sessions."
      formTitle="Generate Knowledge Retrieval Quiz"
      form={form}
      mutation={mutation}
      onSubmit={onSubmit}
      result={quiz}
      resultComponent={
        quiz && (
          <div ref={editorRef} className="bg-light-background-color">
            <Editor key={quiz} initialContent={quiz} fileName="quiz.pdf" />
          </div>
        )
      }
    >
      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Topic or Lesson Title *"
          icon={Captions}
          type="text"
          placeholder="Eg Parts of Digestive System"
          required
          error={errors.topicOrLessonTitle?.message}
          {...register('topicOrLessonTitle', {
            required: 'Topic or Lesson Title is required',
          })}
        />

        <Input
          label="No of Questions"
          icon={FileText}
          type="number"
          error={errors.numberOfQuestions?.message}
          {...register('numberOfQuestions')}
        />

        <Input
          label="Difficulty Level"
          icon={CircleGauge}
          isSelect
          options={difficultyLevelOptions}
          required
          error={errors.difficultyLevel?.message as string}
          {...register('difficultyLevel')}
        />
      </div>
    </ToolForm>
  );
};

export default QuickKnowledgeRetrievalQuiz;
