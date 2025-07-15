import { createSurveyLaunch } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import {
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  Send,
  Target,
  Trash2,
  Users,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type QuestionTypeConfig = {
  type: 'multiple_choice' | 'short_text' | 'rating' | 'yes_no' | 'likert_scale';
  count: number;
  focus?: string;
};

export type SurveyLaunchData = {
  surveyTitle: string;
  targetAudience: string;
  purposeDescription: string;
  deliveryFormat?: string;
  questionTypes: QuestionTypeConfig[];
  launchDate: string;
  deadline?: string;
};

const SurveyLaunchTool = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [surveyLaunch, setSurveyLaunch] = useState<string>('');

  const form = useForm<SurveyLaunchData>({
    defaultValues: {
      surveyTitle: '',
      targetAudience: '',
      purposeDescription: '',
      deliveryFormat: '',
      questionTypes: [
        {
          type: 'multiple_choice',
          count: 1,
          focus: '',
        },
      ],
      launchDate: '',
      deadline: '',
    },
  });

  const {
    register,
    reset,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionTypes',
  });

  const mutation = useMutation({
    mutationFn: createSurveyLaunch,
    onSuccess: (data) => {
      setSurveyLaunch(data.survey);
      reset();
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create survey launch strategy');
    },
  });

  const onSubmit = (data: SurveyLaunchData) => {
    mutation.mutate(data);
  };

  const addQuestionType = () => {
    append({
      type: 'multiple_choice',
      count: 1,
      focus: '',
    });
  };

  const targetAudienceOptions = [
    { value: '', label: 'Select Target Audience' },
    { value: 'Primary School Students', label: 'Primary School Students' },
    { value: 'Secondary School Students', label: 'Secondary School Students' },
    { value: 'Higher Level Students', label: 'Higher Level Students' },
    { value: 'public', label: 'Public' },
    { value: 'parents', label: 'Parents' },
    { value: 'Teachers', label: 'Teachers' },
    { value: 'School Staff', label: 'School Staff' },
  ];

  const deliveryFormatOptions = [
    { value: '', label: 'Select Delivery Format' },
    { value: 'Email', label: 'Email' },
    { value: 'Link', label: 'Shareable Link' },
    { value: 'In Class', label: 'In Class' },
    { value: 'Paper Form', label: 'Paper Form' },
    { value: 'Website Portal', label: 'Website Portal' },
  ];

  const questionTypesOptions = [
    { value: 'Multiple_Choice', label: 'Multiple Choice' },
    { value: 'Short_Text', label: 'Short Text Response' },
    { value: 'Rating', label: 'Rating Scale' },
    { value: 'Yes/No', label: 'Yes/No' },
    { value: 'Likert_Scale', label: 'Likert Scale' },
  ];

  return (
    <ToolForm
      toolTitle="Survey Launch Tool"
      toolIcon="fa-solid fa-poll"
      toolIconColor="text-emerald-500"
      toolDescription="This survey launch tool empowers educators to create comprehensive survey strategies for collecting valuable feedback from students, parents, and staff. Generate professional launch plans with targeted questions, delivery strategies, and engagement tactics to maximize participation and gather actionable insights for school improvement."
      formTitle="Launch Survey Strategy"
      includesSubjectField={false}
      includesClassLevelField={false}
      form={form}
      mutation={mutation}
      onSubmit={onSubmit}
      result={surveyLaunch}
      resultComponent={
        surveyLaunch && (
          <div ref={editorRef} className="bg-light-background-color">
            <Editor
              key={surveyLaunch}
              initialContent={surveyLaunch}
              fileName="survey-launch-strategy.pdf"
            />
          </div>
        )
      }
    >
      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Survey Title"
          icon={FileText}
          placeholder="e.g., Week 5 Student Feedback Survey"
          required
          error={errors.surveyTitle?.message}
          {...register('surveyTitle', {
            required: 'Survey Title is required',
          })}
        />

        <Input
          label="Target Audience *"
          icon={Users}
          isSelect
          options={targetAudienceOptions}
          required
          error={errors.targetAudience?.message as string}
          {...register('targetAudience', {
            required: 'Target audience is required',
          })}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Purpose / Description"
          icon={MessageSquare}
          isTextarea
          placeholder="Explain what this survey is about and why it's important"
          required
          error={errors.purposeDescription?.message}
          {...register('purposeDescription', {
            required: 'Purpose/Description is required',
          })}
        />

        <Input
          label="Delivery Format *"
          icon={Send}
          isSelect
          options={deliveryFormatOptions}
          required
          error={errors.deliveryFormat?.message as string}
          {...register('deliveryFormat', {
            required: 'Delivery format is required',
          })}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Launch Date"
          icon={Calendar}
          type="date"
          required
          error={errors.launchDate?.message}
          {...register('launchDate', {
            required: 'Launch Date is required',
          })}
        />

        <Input
          label="Response Deadline"
          icon={Calendar}
          type="date"
          placeholder="Optional deadline for responses"
          error={errors.deadline?.message}
          {...register('deadline')}
        />
      </div>

      {/* Question Types Configuration Section */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row space-y-1 items-start md:items-center justify-between mb-4">
          <h3 className="text-sm md:text-md font-semibold text-gray-800">
            Question Types Configuration <span className="text-red-500">*</span>
          </h3>
          <button
            type="button"
            onClick={addQuestionType}
            className="flex items-center space-x-2 px-4 py-2 border bg-navy-500 text-white rounded-md hover:bg-navy-50 hover:text-navy-500 hover:border-navy-500 cursor-pointer transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="text-xs md:text-sm">Add Question Type</span>
          </button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-base text-gray-700">
                    Question Type {index + 1}
                  </h4>
                  {/* delete question type button */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="w-full flex flex-col md:flex-row space-x-5">
                  <Input
                    label="Question Type *"
                    icon={Target}
                    isSelect
                    options={questionTypesOptions}
                    required
                    error={errors.questionTypes?.message as string}
                    {...register('questionTypes', {
                      required: 'At least One Question type is required',
                    })}
                  />

                  <Input
                    label="No of Questions *"
                    icon={FileText}
                    type="number"
                    placeholder="Enter the number of questions"
                    required
                    error={
                      errors.questionTypes &&
                      errors.questionTypes[index]?.count?.message
                    }
                    {...register(`questionTypes.${index}.count`, {
                      required: 'Question count is required',
                    })}
                  />

                  <Input
                    label="Focus Area (optional)"
                    icon={FileText}
                    placeholder="Give specific area to focus on if any"
                    required
                    error={errors.surveyTitle?.message}
                    {...register(`questionTypes.${index}.focus`)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No question types configured yet.</p>
            <p className="text-sm">Click "Add Question Type" to get started.</p>
          </div>
        )}
      </div>
    </ToolForm>
  );
};

export default SurveyLaunchTool;
