import Button from '@/components/common/Button';
import CircularShape from '@/components/common/CircularShape';
import FormTitle from '@/components/common/FormTitle';
import ToolTitle from '@/components/common/ToolTitle';
import { useClassLevels } from '@/hooks/useClassLevels';
import { useSubjects } from '@/hooks/useSubjects';
import type { UseMutationResult } from '@tanstack/react-query';
import { ListPlus, Loader } from 'lucide-react';
import type { ReactNode } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import Input from '../common/Input';
import { useAcademicTerms } from '@/hooks/useAcademicTerms';

interface ToolFormProps<T extends FieldValues, R = unknown> {
  toolTitle: string;
  toolIcon: string;
  toolIconColor: string;
  toolDescription: string;

  // Form configuration
  formTitle: string;
  form: UseFormReturn<T>;
  mutation: UseMutationResult<R, Error, T>;
  onSubmit: (data: T) => void;

  // Form content
  children: ReactNode;

  // Result display
  result?: string;
  resultComponent?: ReactNode;

  // Subject and Class Level configuration
  subjectFieldName?: Path<T>;
  classLevelFieldName?: Path<T>;
  academicTermFieldName?: Path<T>;
  includesAcademicTerm?: boolean;
}

const ToolForm = <T extends FieldValues>({
  toolTitle,
  toolIcon,
  toolIconColor,
  toolDescription,
  formTitle,
  form,
  mutation,
  onSubmit,
  children,
  result,
  resultComponent,
  subjectFieldName = 'subject' as Path<T>,
  classLevelFieldName = 'classLevel' as Path<T>,
  academicTermFieldName = 'term' as Path<T>,
  includesAcademicTerm = false,
}: ToolFormProps<T>) => {
  const { isClassLevelPending, classLevels } = useClassLevels();
  const { isSubjectsPending, subjects } = useSubjects();
  const { isAcademicTermsPending, academicTerms } = useAcademicTerms();

  // Handle loading and error states
  if (isClassLevelPending || isSubjectsPending || isAcademicTermsPending)
    return <Loader />;

  const classLevelsOptions = classLevels.map((classLevel) => ({
    value: classLevel.name,
    label: classLevel.name,
  }));

  const subjectOptions = subjects.map((subject) => ({
    value: subject.name,
    label: subject.name,
  }));

  const termOptions = academicTerms.map((term) => ({
    value: term.name,
    label: term.name,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <div
      className={
        'relative section w-full h-full bg-light-background-color overflow-hidden py-10'
      }
    >
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
          title={toolTitle}
          icon={toolIcon}
          iconColor={toolIconColor}
          description={toolDescription}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-5 px-10 mb-10 w-full flex flex-col items-center justify-center shadow-xl bg-white border border-gray-300/80 rounded-2xl"
        >
          <FormTitle title={formTitle} />

          <div className="w-full flex flex-col md:flex-row space-x-5">
            <Input
              label="Subject"
              icon={ListPlus}
              isSelect
              options={subjectOptions}
              required
              error={errors[subjectFieldName]?.message as string}
              {...register(subjectFieldName, {
                required: 'Subject is required',
              })}
            />

            <Input
              label="Class Level"
              icon={ListPlus}
              isSelect
              options={classLevelsOptions}
              required
              error={errors[classLevelFieldName]?.message as string}
              {...register(classLevelFieldName, {
                required: 'Class level is required',
              })}
            />
            {includesAcademicTerm && (
              <Input
                label="Academic Term"
                icon={ListPlus}
                isSelect
                options={termOptions}
                required
                error={errors[academicTermFieldName]?.message as string}
                {...register(academicTermFieldName, {
                  required: 'Academic Term is required',
                })}
              />
            )}
          </div>

          {children}
          <Button isPending={mutation.isPending} />
        </form>

        {result && resultComponent}
      </div>
    </div>
  );
};

export default ToolForm;
