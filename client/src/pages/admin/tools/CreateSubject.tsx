import Title from '@/components/common/Title';

const CreateSubject = () => {
  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Create Subject"
        subtitle="Manage your educational platform with these powerful administrative
            tools"
        align="left"
      />
      <div className="p-5 mb-10 bg-white border rounded-2xl"></div>
    </div>
  );
};

export default CreateSubject;
