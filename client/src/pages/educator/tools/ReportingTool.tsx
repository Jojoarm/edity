import { createReport } from '@/api/educator-api';
import Input from '@/components/common/Input';
import Editor from '@/components/educator/Editor';
import ToolForm from '@/components/educator/ToolForm';
import { useMutation } from '@tanstack/react-query';
import {
  Atom,
  CircleFadingArrowUp,
  GraduationCap,
  NotebookPen,
  Shield,
  User,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type ReportingToolData = {
  studentName: string;
  subject: string;
  term: string;
  classLevel: string;
  strengths: string;
  improvementAreas: string;
  behaviorAndParticipation: string;
  academicPerformanceSummary: string;
  teacherNote?: string;
};

const ReportingTool = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [report, setReport] = useState<string>('');
  const form = useForm<ReportingToolData>({
    defaultValues: {
      studentName: '',
      subject: '',
      term: '',
      classLevel: '',
      strengths: '',
      improvementAreas: '',
      behaviorAndParticipation: '',
      academicPerformanceSummary: '',
      teacherNote: '',
    },
  });

  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: createReport,
    onSuccess: (data) => {
      setReport(data.report);
      reset();
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate report');
    },
  });

  const onSubmit = (data: ReportingToolData) => {
    mutation.mutate(data);
  };

  return (
    <ToolForm
      toolTitle="Reporting Tool"
      toolIcon="fa-solid fa-file-invoice"
      toolIconColor="text-pink-300"
      toolDescription="This reporting tool empowers educators to effortlessly generate detailed performance and learning progress reports for individual students. By inputting key insights such as class, subject, behavioral notes, and student strengths or challenges, teachers receive AI generated, well structured, and fully editable reports, streamlining documentation and driving data informed instruction."
      formTitle="Generate Report"
      form={form}
      includesAcademicTerm
      mutation={mutation}
      onSubmit={onSubmit}
      result={report}
      resultComponent={
        report && (
          <div ref={editorRef} className="bg-light-background-color">
            <Editor
              key={report}
              initialContent={report}
              fileName="report.pdf"
            />
          </div>
        )
      }
    >
      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Student Name "
          icon={User}
          isTextarea
          placeholder="Eg John Bosco"
          required
          error={errors.studentName?.message}
          {...register('studentName', {
            required: 'Student Name is required',
          })}
        />

        <Input
          label="Academic Performance Summary"
          icon={GraduationCap}
          isTextarea
          placeholder="Teacher notes"
          required
          error={errors.academicPerformanceSummary?.message}
          {...register('academicPerformanceSummary', {
            required: 'Academic Performance Summary is required',
          })}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Behavior & Participation"
          icon={Atom}
          isTextarea
          placeholder="Eg very attentive, distracted"
          required
          error={errors.behaviorAndParticipation?.message}
          {...register('behaviorAndParticipation', {
            required: 'Behavior & Participation is required',
          })}
        />

        <Input
          label="Student Strengths"
          icon={Shield}
          isTextarea
          placeholder="Where the student excels"
          required
          error={errors.strengths?.message}
          {...register('strengths', {
            required: "Student's Strengths is required",
          })}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row space-x-5">
        <Input
          label="Areas for Improvement"
          icon={CircleFadingArrowUp}
          isTextarea
          placeholder="What needs more work"
          required
          error={errors.improvementAreas?.message}
          {...register('improvementAreas', {
            required: 'Areas for Improvement is required',
          })}
        />

        {
          <Input
            label="Teacher Notes"
            icon={NotebookPen}
            isTextarea
            placeholder="Personalized observations"
            error={errors.teacherNote?.message}
            {...register('teacherNote')}
          />
        }
      </div>
    </ToolForm>
  );
};

export default ReportingTool;
